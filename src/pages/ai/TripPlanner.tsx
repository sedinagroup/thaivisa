import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Plane, 
  Hotel, 
  Car, 
  Utensils, 
  Camera, 
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  Loader2,
  Download,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

interface TripPlan {
  destination: string;
  duration: number;
  budget: number;
  travelers: number;
  itinerary: DayPlan[];
  recommendations: {
    flights: FlightOption[];
    hotels: HotelOption[];
    activities: ActivityOption[];
    restaurants: RestaurantOption[];
  };
  totalCost: number;
  budgetBreakdown: BudgetBreakdown;
}

interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  meals: Meal[];
  accommodation: string;
  transportation: string;
  estimatedCost: number;
}

interface Activity {
  time: string;
  name: string;
  description: string;
  location: string;
  duration: string;
  cost: number;
  rating: number;
  category: string;
}

interface Meal {
  time: string;
  restaurant: string;
  cuisine: string;
  cost: number;
  rating: number;
}

interface FlightOption {
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
}

interface HotelOption {
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  description: string;
}

interface ActivityOption {
  name: string;
  category: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  duration: string;
}

interface RestaurantOption {
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  averageCost: number;
  specialty: string;
}

interface BudgetBreakdown {
  accommodation: number;
  food: number;
  activities: number;
  transportation: number;
  miscellaneous: number;
}

const AITripPlanner: React.FC = () => {
  const { user } = useAuth();
  const { credits, consumeCredits } = useCredits();
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: 1000,
    interests: [] as string[],
    travelStyle: 'balanced' as 'budget' | 'balanced' | 'luxury'
  });

  const interestOptions = [
    'Cultura e História',
    'Praias e Relaxamento',
    'Aventura e Esportes',
    'Gastronomia',
    'Vida Noturna',
    'Natureza e Vida Selvagem',
    'Compras',
    'Templos e Espiritualidade',
    'Arte e Museus',
    'Fotografia'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateTripPlan = async () => {
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (credits < 40) {
      setError('Créditos insuficientes. Você precisa de 40 créditos para gerar um plano de viagem.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Consume credits first
      await consumeCredits(40, 'AI Trip Planner', `Plano de viagem para ${formData.destination}`);

      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate mock trip plan
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      const mockTripPlan: TripPlan = {
        destination: formData.destination,
        duration,
        budget: formData.budget,
        travelers: formData.travelers,
        itinerary: generateItinerary(duration, startDate),
        recommendations: generateRecommendations(),
        totalCost: Math.floor(formData.budget * 0.95),
        budgetBreakdown: generateBudgetBreakdown(formData.budget)
      };

      setTripPlan(mockTripPlan);
      toast.success('Plano de viagem gerado com sucesso!');
    } catch (err) {
      setError('Erro ao gerar plano de viagem. Tente novamente.');
      console.error('Trip planning error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateItinerary = (duration: number, startDate: Date): DayPlan[] => {
    const days: DayPlan[] = [];
    
    for (let i = 0; i < duration; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      days.push({
        day: i + 1,
        date: currentDate.toLocaleDateString('pt-BR'),
        activities: generateDayActivities(i + 1),
        meals: generateDayMeals(),
        accommodation: i === 0 ? 'Check-in no hotel' : 'Hotel Bangkok Palace',
        transportation: i === 0 ? 'Chegada ao aeroporto' : 'Transporte local',
        estimatedCost: Math.floor(formData.budget / duration)
      });
    }
    
    return days;
  };

  const generateDayActivities = (day: number): Activity[] => {
    const activities = [
      {
        time: '09:00',
        name: 'Grande Palácio Real',
        description: 'Visite o complexo histórico mais importante da Tailândia',
        location: 'Bangkok Centro',
        duration: '3 horas',
        cost: 500,
        rating: 4.8,
        category: 'Cultura'
      },
      {
        time: '14:00',
        name: 'Templo Wat Pho',
        description: 'Famoso templo com o Buda Reclinado gigante',
        location: 'Bangkok Centro',
        duration: '2 horas',
        cost: 200,
        rating: 4.7,
        category: 'Religioso'
      },
      {
        time: '17:00',
        name: 'Mercado Flutuante',
        description: 'Experiência única de compras em barcos tradicionais',
        location: 'Damnoen Saduak',
        duration: '2 horas',
        cost: 300,
        rating: 4.5,
        category: 'Compras'
      }
    ];

    return activities.slice(0, day === 1 ? 2 : 3);
  };

  const generateDayMeals = (): Meal[] => {
    return [
      {
        time: '08:00',
        restaurant: 'Café da Manhã do Hotel',
        cuisine: 'Internacional',
        cost: 150,
        rating: 4.2
      },
      {
        time: '12:30',
        restaurant: 'Som Tam Nua',
        cuisine: 'Tailandesa',
        cost: 200,
        rating: 4.6
      },
      {
        time: '19:00',
        restaurant: 'Blue Elephant',
        cuisine: 'Tailandesa Premium',
        cost: 800,
        rating: 4.8
      }
    ];
  };

  const generateRecommendations = () => {
    return {
      flights: [
        {
          airline: 'Thai Airways',
          departure: '10:30',
          arrival: '14:45',
          duration: '15h 15m',
          price: 2500,
          stops: 1
        },
        {
          airline: 'Emirates',
          departure: '23:40',
          arrival: '18:30+1',
          duration: '16h 50m',
          price: 2800,
          stops: 1
        }
      ],
      hotels: [
        {
          name: 'Bangkok Palace Hotel',
          location: 'Centro de Bangkok',
          rating: 4.5,
          pricePerNight: 300,
          amenities: ['Wi-Fi', 'Piscina', 'Spa', 'Academia'],
          description: 'Hotel luxuoso no coração de Bangkok'
        },
        {
          name: 'Riverside Resort',
          location: 'Rio Chao Phraya',
          rating: 4.3,
          pricePerNight: 250,
          amenities: ['Wi-Fi', 'Vista do Rio', 'Restaurante'],
          description: 'Resort com vista panorâmica do rio'
        }
      ],
      activities: [
        {
          name: 'Tour de Templos',
          category: 'Cultura',
          description: 'Visite os principais templos de Bangkok',
          location: 'Bangkok',
          price: 800,
          rating: 4.7,
          duration: '6 horas'
        },
        {
          name: 'Aula de Culinária Tailandesa',
          category: 'Gastronomia',
          description: 'Aprenda a cozinhar pratos tradicionais',
          location: 'Bangkok',
          price: 600,
          rating: 4.8,
          duration: '4 horas'
        }
      ],
      restaurants: [
        {
          name: 'Gaggan',
          cuisine: 'Molecular Tailandesa',
          location: 'Bangkok',
          rating: 4.9,
          averageCost: 1200,
          specialty: 'Menu degustação inovador'
        },
        {
          name: 'Jay Fai',
          cuisine: 'Street Food',
          location: 'Bangkok',
          rating: 4.6,
          averageCost: 300,
          specialty: 'Pad Thai com caranguejo'
        }
      ]
    };
  };

  const generateBudgetBreakdown = (budget: number): BudgetBreakdown => {
    return {
      accommodation: Math.floor(budget * 0.35),
      food: Math.floor(budget * 0.25),
      activities: Math.floor(budget * 0.20),
      transportation: Math.floor(budget * 0.15),
      miscellaneous: Math.floor(budget * 0.05)
    };
  };

  const downloadPlan = () => {
    if (!tripPlan) return;
    
    const planText = `
PLANO DE VIAGEM - ${tripPlan.destination.toUpperCase()}
Gerado por Thailand Visa AI

INFORMAÇÕES GERAIS:
- Destino: ${tripPlan.destination}
- Duração: ${tripPlan.duration} dias
- Viajantes: ${tripPlan.travelers}
- Orçamento: R$ ${tripPlan.budget}
- Custo Estimado: R$ ${tripPlan.totalCost}

ROTEIRO DIÁRIO:
${tripPlan.itinerary.map(day => `
DIA ${day.day} - ${day.date}
Atividades:
${day.activities.map(activity => `- ${activity.time}: ${activity.name} (${activity.duration})`).join('\n')}

Refeições:
${day.meals.map(meal => `- ${meal.time}: ${meal.restaurant} (${meal.cuisine})`).join('\n')}

Custo estimado do dia: R$ ${day.estimatedCost}
`).join('\n')}

ORÇAMENTO DETALHADO:
- Hospedagem: R$ ${tripPlan.budgetBreakdown.accommodation}
- Alimentação: R$ ${tripPlan.budgetBreakdown.food}
- Atividades: R$ ${tripPlan.budgetBreakdown.activities}
- Transporte: R$ ${tripPlan.budgetBreakdown.transportation}
- Diversos: R$ ${tripPlan.budgetBreakdown.miscellaneous}

Gerado em: ${new Date().toLocaleString('pt-BR')}
    `;

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plano-viagem-${tripPlan.destination.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Plano de viagem baixado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Trip Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Crie o plano de viagem perfeito para a Tailândia com inteligência artificial
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {credits} créditos disponíveis
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              40 créditos por plano
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Detalhes da Viagem
                </CardTitle>
                <CardDescription>
                  Preencha as informações para gerar seu plano personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="destination">Destino na Tailândia</Label>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="Ex: Bangkok, Phuket, Chiang Mai"
                    value={formData.destination}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data de Fim</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelers">Viajantes</Label>
                    <Input
                      id="travelers"
                      name="travelers"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.travelers}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Orçamento (R$)</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      min="500"
                      step="100"
                      value={formData.budget}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Estilo de Viagem</Label>
                  <select
                    name="travelStyle"
                    value={formData.travelStyle}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="budget">Econômica</option>
                    <option value="balanced">Equilibrada</option>
                    <option value="luxury">Luxuosa</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Interesses (selecione até 5)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((interest) => (
                      <Button
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInterestToggle(interest)}
                        disabled={!formData.interests.includes(interest) && formData.interests.length >= 5}
                        className="text-xs"
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={generateTripPlan}
                  disabled={loading || credits < 40}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando Plano...
                    </>
                  ) : (
                    <>
                      <MapPin className="mr-2 h-4 w-4" />
                      Gerar Plano de Viagem
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {tripPlan ? (
              <div className="space-y-6">
                {/* Trip Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Plano de Viagem para {tripPlan.destination}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={downloadPlan}>
                          <Download className="w-4 h-4 mr-2" />
                          Baixar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {tripPlan.duration} dias • {tripPlan.travelers} viajante(s) • R$ {tripPlan.totalCost} estimado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div className="text-center">
                        <Hotel className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-sm text-gray-600">Hospedagem</div>
                        <div className="font-semibold">R$ {tripPlan.budgetBreakdown.accommodation}</div>
                      </div>
                      <div className="text-center">
                        <Utensils className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <div className="text-sm text-gray-600">Alimentação</div>
                        <div className="font-semibold">R$ {tripPlan.budgetBreakdown.food}</div>
                      </div>
                      <div className="text-center">
                        <Camera className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <div className="text-sm text-gray-600">Atividades</div>
                        <div className="font-semibold">R$ {tripPlan.budgetBreakdown.activities}</div>
                      </div>
                      <div className="text-center">
                        <Car className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                        <div className="text-sm text-gray-600">Transporte</div>
                        <div className="font-semibold">R$ {tripPlan.budgetBreakdown.transportation}</div>
                      </div>
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                        <div className="text-sm text-gray-600">Diversos</div>
                        <div className="font-semibold">R$ {tripPlan.budgetBreakdown.miscellaneous}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Itinerary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Roteiro Diário</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {tripPlan.itinerary.map((day, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold">Dia {day.day} - {day.date}</h3>
                            <Badge variant="outline">R$ {day.estimatedCost}</Badge>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Camera className="w-4 h-4" />
                                Atividades
                              </h4>
                              <div className="space-y-2">
                                {day.activities.map((activity, actIndex) => (
                                  <div key={actIndex} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="font-medium">{activity.time}</span>
                                        <span>{activity.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm">{activity.rating}</span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                                      {activity.description} • {activity.duration} • R$ {activity.cost}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Utensils className="w-4 h-4" />
                                Refeições
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {day.meals.map((meal, mealIndex) => (
                                  <div key={mealIndex} className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                                    <div className="text-sm font-medium">{meal.time}</div>
                                    <div className="text-sm">{meal.restaurant}</div>
                                    <div className="text-xs text-gray-600">{meal.cuisine} • R$ {meal.cost}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hotels */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Hotel className="w-5 h-5" />
                        Hotéis Recomendados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {tripPlan.recommendations.hotels.map((hotel, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{hotel.name}</h4>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm">{hotel.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{hotel.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">{hotel.location}</span>
                              <span className="font-semibold">R$ {hotel.pricePerNight}/noite</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {hotel.amenities.map((amenity, aIndex) => (
                                <Badge key={aIndex} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Flights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plane className="w-5 h-5" />
                        Voos Sugeridos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {tripPlan.recommendations.flights.map((flight, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{flight.airline}</h4>
                              <span className="font-semibold">R$ {flight.price}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <div>Saída: {flight.departure}</div>
                              <div>Chegada: {flight.arrival}</div>
                              <div>Duração: {flight.duration}</div>
                              <div>Escalas: {flight.stops === 0 ? 'Direto' : `${flight.stops} escala(s)`}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Pronto para planejar sua viagem?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Preencha os detalhes ao lado e nossa IA criará um plano personalizado para você.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITripPlanner;