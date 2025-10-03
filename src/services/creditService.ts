export interface CreditTransaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  timestamp: Date;
  balance: number;
}

export interface CreditBalance {
  total: number;
  lastUpdated: Date;
}

class CreditService {
  private readonly STORAGE_KEY = 'thaivisa_credits';
  private readonly TRANSACTIONS_KEY = 'thaivisa_credit_transactions';
  private readonly DEFAULT_CREDITS = 1000; // Créditos iniciais para novos usuários

  // Obter saldo atual
  getBalance(): number {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        // Primeiro acesso - dar créditos iniciais
        this.setBalance(this.DEFAULT_CREDITS);
        return this.DEFAULT_CREDITS;
      }
      
      const balance: CreditBalance = JSON.parse(stored);
      console.log('[CreditService] Current balance:', balance.total);
      return balance.total;
    } catch (error) {
      console.error('[CreditService] Error getting balance:', error);
      return 0;
    }
  }

  // Definir saldo
  setBalance(amount: number): void {
    try {
      const balance: CreditBalance = {
        total: Math.max(0, amount), // Nunca permitir saldo negativo
        lastUpdated: new Date()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(balance));
      console.log('[CreditService] Balance set to:', balance.total);
      
      // Disparar evento customizado para atualizar UI
      window.dispatchEvent(new CustomEvent('creditsUpdated', { 
        detail: { balance: balance.total } 
      }));
    } catch (error) {
      console.error('[CreditService] Error setting balance:', error);
    }
  }

  // Debitar créditos
  debitCredits(amount: number, description: string): boolean {
    try {
      const currentBalance = this.getBalance();
      console.log('[CreditService] Attempting to debit:', amount, 'from balance:', currentBalance);
      
      if (currentBalance < amount) {
        console.warn('[CreditService] Insufficient credits:', currentBalance, '<', amount);
        return false;
      }

      const newBalance = currentBalance - amount;
      this.setBalance(newBalance);
      
      // Registrar transação
      this.addTransaction({
        id: Date.now().toString(),
        type: 'debit',
        amount,
        description,
        timestamp: new Date(),
        balance: newBalance
      });

      console.log('[CreditService] Credits debited successfully. New balance:', newBalance);
      return true;
    } catch (error) {
      console.error('[CreditService] Error debiting credits:', error);
      return false;
    }
  }

  // Creditar créditos (para compras)
  creditCredits(amount: number, description: string): void {
    try {
      const currentBalance = this.getBalance();
      const newBalance = currentBalance + amount;
      this.setBalance(newBalance);
      
      // Registrar transação
      this.addTransaction({
        id: Date.now().toString(),
        type: 'credit',
        amount,
        description,
        timestamp: new Date(),
        balance: newBalance
      });

      console.log('[CreditService] Credits added successfully. New balance:', newBalance);
    } catch (error) {
      console.error('[CreditService] Error crediting credits:', error);
    }
  }

  // Verificar se tem créditos suficientes
  hasEnoughCredits(amount: number): boolean {
    const balance = this.getBalance();
    const hasEnough = balance >= amount;
    console.log('[CreditService] Checking credits:', balance, '>=', amount, '=', hasEnough);
    return hasEnough;
  }

  // Obter histórico de transações
  getTransactions(): CreditTransaction[] {
    try {
      const stored = localStorage.getItem(this.TRANSACTIONS_KEY);
      if (!stored) return [];
      
      const transactions = JSON.parse(stored);
      return transactions.map((t: any) => ({
        ...t,
        timestamp: new Date(t.timestamp)
      }));
    } catch (error) {
      console.error('[CreditService] Error getting transactions:', error);
      return [];
    }
  }

  // Adicionar transação ao histórico
  private addTransaction(transaction: CreditTransaction): void {
    try {
      const transactions = this.getTransactions();
      transactions.unshift(transaction); // Adicionar no início (mais recente primeiro)
      
      // Manter apenas as últimas 100 transações
      const limitedTransactions = transactions.slice(0, 100);
      
      localStorage.setItem(this.TRANSACTIONS_KEY, JSON.stringify(limitedTransactions));
    } catch (error) {
      console.error('[CreditService] Error adding transaction:', error);
    }
  }

  // Limpar dados (para desenvolvimento/teste)
  clearData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TRANSACTIONS_KEY);
    console.log('[CreditService] All credit data cleared');
  }

  // Resetar para créditos padrão
  reset(): void {
    this.setBalance(this.DEFAULT_CREDITS);
    localStorage.removeItem(this.TRANSACTIONS_KEY);
    console.log('[CreditService] Credits reset to default:', this.DEFAULT_CREDITS);
  }
}

export const creditService = new CreditService();