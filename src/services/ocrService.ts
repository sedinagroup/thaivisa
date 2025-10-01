import Tesseract from 'tesseract.js';

export interface PassportData {
  firstName: string;
  lastName: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  expiryDate: string;
  confidence: number;
}

export interface OCRResult {
  success: boolean;
  data?: PassportData;
  rawText?: string;
  error?: string;
  confidence: number;
}

class OCRService {
  private worker: Tesseract.Worker | null = null;

  async initialize(): Promise<void> {
    if (this.worker) return;
    
    this.worker = await Tesseract.createWorker('eng');
    await this.worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>',
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
    });
  }

  async processPassportImage(imageFile: File): Promise<OCRResult> {
    try {
      await this.initialize();
      
      if (!this.worker) {
        throw new Error('OCR worker not initialized');
      }

      // Preprocess image for better OCR results
      const preprocessedImage = await this.preprocessImage(imageFile);
      
      // Perform OCR
      const { data } = await this.worker.recognize(preprocessedImage);
      const rawText = data.text;
      
      // Parse passport data from OCR text
      const passportData = this.parsePassportData(rawText);
      
      return {
        success: true,
        data: passportData,
        rawText,
        confidence: data.confidence
      };
    } catch (error) {
      console.error('OCR processing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown OCR error',
        confidence: 0
      };
    }
  }

  private async preprocessImage(file: File): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      img.onload = () => {
        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Apply image enhancements
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Increase contrast and brightness
        for (let i = 0; i < data.length; i += 4) {
          // Apply contrast (1.5x) and brightness (+20)
          data[i] = Math.min(255, Math.max(0, (data[i] - 128) * 1.5 + 128 + 20));     // Red
          data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * 1.5 + 128 + 20)); // Green
          data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * 1.5 + 128 + 20)); // Blue
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  private parsePassportData(text: string): PassportData {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    const passportData: PassportData = {
      firstName: '',
      lastName: '',
      passportNumber: '',
      nationality: '',
      dateOfBirth: '',
      expiryDate: '',
      confidence: 0
    };

    // Common passport patterns
    const patterns = {
      // MRZ (Machine Readable Zone) patterns
      passportNumber: /P<([A-Z]{3})([A-Z0-9<]{9})/,
      mrzLine1: /P<([A-Z]{3})([A-Z<]+)<<([A-Z<]+)/,
      mrzLine2: /([A-Z0-9<]{9})([0-9])([A-Z]{3})([0-9]{6})([0-9])([MF])([0-9]{6})([0-9])/,
      
      // Text-based patterns
      passportNumberText: /(?:PASSPORT\s*(?:NO|NUMBER|#)?[:\s]*)?([A-Z0-9]{6,9})/i,
      namePattern: /(?:NAME|NOME)[:\s]*([A-Z\s]+)/i,
      surnamePattern: /(?:SURNAME|SOBRENOME)[:\s]*([A-Z\s]+)/i,
      nationalityPattern: /(?:NATIONALITY|NACIONALIDADE)[:\s]*([A-Z]{3}|[A-Z\s]+)/i,
      dobPattern: /(?:DATE\s*OF\s*BIRTH|NASCIMENTO)[:\s]*(\d{2}[/\-.]\d{2}[/\-.]\d{4})/i,
      expiryPattern: /(?:DATE\s*OF\s*EXPIRY|VALIDADE)[:\s]*(\d{2}[/\-.]\d{2}[/\-.]\d{4})/i,
    };

    let confidence = 0;
    const foundFields = [];

    // Try to parse MRZ format first
    for (const line of lines) {
      // MRZ Line 1: P<COUNTRY_CODE<SURNAME<<GIVEN_NAMES
      const mrzMatch1 = line.match(patterns.mrzLine1);
      if (mrzMatch1) {
        passportData.nationality = mrzMatch1[1];
        const names = mrzMatch1[2].replace(/</g, ' ').trim().split(/\s+/);
        passportData.lastName = names[0] || '';
        foundFields.push('nationality', 'lastName');
        confidence += 20;
      }

      // MRZ Line 2: PASSPORT_NUMBER + CHECK_DIGIT + COUNTRY + DOB + CHECK + SEX + EXPIRY + CHECK
      const mrzMatch2 = line.match(patterns.mrzLine2);
      if (mrzMatch2) {
        passportData.passportNumber = mrzMatch2[1].replace(/</g, '');
        const dobRaw = mrzMatch2[4];
        const expiryRaw = mrzMatch2[7];
        
        // Convert YYMMDD to DD/MM/YYYY
        if (dobRaw && dobRaw.length === 6) {
          const year = parseInt(dobRaw.substring(0, 2)) + (parseInt(dobRaw.substring(0, 2)) > 30 ? 1900 : 2000);
          const month = dobRaw.substring(2, 4);
          const day = dobRaw.substring(4, 6);
          passportData.dateOfBirth = `${day}/${month}/${year}`;
          foundFields.push('dateOfBirth');
          confidence += 15;
        }
        
        if (expiryRaw && expiryRaw.length === 6) {
          const year = parseInt(expiryRaw.substring(0, 2)) + (parseInt(expiryRaw.substring(0, 2)) > 30 ? 1900 : 2000);
          const month = expiryRaw.substring(2, 4);
          const day = expiryRaw.substring(4, 6);
          passportData.expiryDate = `${day}/${month}/${year}`;
          foundFields.push('expiryDate');
          confidence += 15;
        }
        
        foundFields.push('passportNumber');
        confidence += 25;
      }
    }

    // If MRZ parsing didn't work, try text-based parsing
    if (confidence < 50) {
      const fullText = lines.join(' ');

      // Extract passport number
      const passportMatch = fullText.match(patterns.passportNumberText);
      if (passportMatch && !passportData.passportNumber) {
        passportData.passportNumber = passportMatch[1];
        foundFields.push('passportNumber');
        confidence += 25;
      }

      // Extract names
      const nameMatch = fullText.match(patterns.namePattern);
      const surnameMatch = fullText.match(patterns.surnamePattern);
      
      if (nameMatch && !passportData.firstName) {
        passportData.firstName = nameMatch[1].trim();
        foundFields.push('firstName');
        confidence += 15;
      }
      
      if (surnameMatch && !passportData.lastName) {
        passportData.lastName = surnameMatch[1].trim();
        foundFields.push('lastName');
        confidence += 15;
      }

      // Extract nationality
      const nationalityMatch = fullText.match(patterns.nationalityPattern);
      if (nationalityMatch && !passportData.nationality) {
        passportData.nationality = nationalityMatch[1].trim();
        foundFields.push('nationality');
        confidence += 10;
      }

      // Extract dates
      const dobMatch = fullText.match(patterns.dobPattern);
      if (dobMatch && !passportData.dateOfBirth) {
        passportData.dateOfBirth = dobMatch[1];
        foundFields.push('dateOfBirth');
        confidence += 15;
      }

      const expiryMatch = fullText.match(patterns.expiryPattern);
      if (expiryMatch && !passportData.expiryDate) {
        passportData.expiryDate = expiryMatch[1];
        foundFields.push('expiryDate');
        confidence += 15;
      }
    }

    // Clean up extracted data
    passportData.firstName = this.cleanName(passportData.firstName);
    passportData.lastName = this.cleanName(passportData.lastName);
    passportData.passportNumber = passportData.passportNumber.replace(/[^A-Z0-9]/g, '');
    passportData.confidence = Math.min(100, confidence);

    return passportData;
  }

  private cleanName(name: string): string {
    return name
      .replace(/[<>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  async terminate(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

export const ocrService = new OCRService();