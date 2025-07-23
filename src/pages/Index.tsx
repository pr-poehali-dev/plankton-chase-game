import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [coins, setCoins] = useState(1250);
  const [currentView, setCurrentView] = useState('menu');
  
  const shopItems = [
    { id: 1, name: 'Ускорение', description: 'Увеличивает скорость бега на 25%', price: 500, icon: 'Zap', owned: false },
    { id: 2, name: 'Супер прыжок', description: 'Позволяет прыгать выше препятствий', price: 750, icon: 'ArrowUp', owned: false },
    { id: 3, name: 'Магнит монет', description: 'Автоматически собирает близкие монеты', price: 600, icon: 'Magnet', owned: false },
    { id: 4, name: 'Щит', description: 'Защищает от одного препятствия', price: 400, icon: 'Shield', owned: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'SpongeBob', score: 15420 },
    { rank: 2, name: 'Patrick', score: 12100 },
    { rank: 3, name: 'Squidward', score: 9850 },
    { rank: 4, name: 'Sandy', score: 8900 },
    { rank: 5, name: 'Mr.Krabs', score: 7550 },
  ];

  const renderMainMenu = () => (
    <div className="min-h-screen bg-gradient-to-b from-cyan-200 via-blue-300 to-blue-600 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Bubble animations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white bg-opacity-30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 z-10">
        {/* Game Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-yellow-400 drop-shadow-lg animate-pulse" 
              style={{ 
                textShadow: '4px 4px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
                fontFamily: 'Comic Sans MS, cursive'
              }}>
            SPONGEBOB
          </h1>
          <h2 className="text-4xl font-bold text-white drop-shadow-lg"
              style={{ 
                textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
                fontFamily: 'Comic Sans MS, cursive'
              }}>
            RUNNER
          </h2>
        </div>

        {/* Character Image */}
        <div className="mb-8">
          <img 
            src="/img/9bb7b3d1-d4dc-4773-a864-cc78b043b220.jpg" 
            alt="SpongeBob Running" 
            className="w-48 h-48 mx-auto rounded-full border-4 border-yellow-400 shadow-2xl hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Coins Display */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Icon name="Coins" size={32} className="text-yellow-400" />
          <span className="text-2xl font-bold text-white drop-shadow-lg">{coins}</span>
        </div>

        {/* Menu Buttons */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Button 
            size="lg" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl py-4 px-8 rounded-xl border-4 border-orange-400 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Icon name="Play" size={24} className="mr-2" />
            ИГРАТЬ
          </Button>
          
          <Button 
            size="lg" 
            onClick={() => setCurrentView('shop')}
            className="bg-green-400 hover:bg-green-500 text-black font-bold text-xl py-4 px-8 rounded-xl border-4 border-green-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Icon name="ShoppingBag" size={24} className="mr-2" />
            МАГАЗИН
          </Button>
          
          <Button 
            size="lg" 
            onClick={() => setCurrentView('leaderboard')}
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold text-xl py-4 px-8 rounded-xl border-4 border-purple-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Icon name="Trophy" size={24} className="mr-2" />
            РЕКОРДЫ
          </Button>
          
          <Button 
            size="lg" 
            onClick={() => setCurrentView('settings')}
            className="bg-gray-400 hover:bg-gray-500 text-black font-bold text-xl py-4 px-8 rounded-xl border-4 border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Icon name="Settings" size={24} className="mr-2" />
            НАСТРОЙКИ
          </Button>
        </div>
      </div>
    </div>
  );

  const renderShop = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-emerald-300 to-teal-500 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => setCurrentView('menu')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          
          <h1 className="text-4xl font-bold text-white drop-shadow-lg text-center flex-1"
              style={{ 
                textShadow: '2px 2px 0px #000',
                fontFamily: 'Comic Sans MS, cursive'
              }}>
            МАГАЗИН УЛУЧШЕНИЙ
          </h1>
          
          <div className="flex items-center space-x-2">
            <Icon name="Coins" size={28} className="text-yellow-400" />
            <span className="text-2xl font-bold text-white">{coins}</span>
          </div>
        </div>

        {/* Shop Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shopItems.map((item) => (
            <Card key={item.id} className="bg-white bg-opacity-90 border-4 border-blue-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name={item.icon} size={32} className="text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-blue-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-700 text-lg">{item.description}</p>
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Coins" size={24} className="text-yellow-500" />
                  <span className="text-xl font-bold text-yellow-600">{item.price}</span>
                </div>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-3"
                  disabled={coins < item.price}
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  {coins >= item.price ? 'КУПИТЬ' : 'НЕ ХВАТАЕТ МОНЕТ'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 via-pink-300 to-red-400 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => setCurrentView('menu')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          
          <h1 className="text-4xl font-bold text-white drop-shadow-lg text-center flex-1"
              style={{ 
                textShadow: '2px 2px 0px #000',
                fontFamily: 'Comic Sans MS, cursive'
              }}>
            ТАБЛИЦА РЕКОРДОВ
          </h1>
        </div>

        {/* Leaderboard */}
        <Card className="bg-white bg-opacity-95 border-4 border-purple-400 shadow-2xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              {leaderboard.map((player) => (
                <div key={player.rank} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-orange-300 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <Badge 
                      className={`text-lg font-bold px-3 py-1 ${
                        player.rank === 1 ? 'bg-yellow-400 text-black' :
                        player.rank === 2 ? 'bg-gray-300 text-black' :
                        player.rank === 3 ? 'bg-orange-400 text-black' :
                        'bg-blue-400 text-white'
                      }`}
                    >
                      #{player.rank}
                    </Badge>
                    <span className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      {player.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={24} className="text-yellow-500" />
                    <span className="text-xl font-bold text-gray-800">{player.score.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 via-slate-300 to-gray-500 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => setCurrentView('menu')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          
          <h1 className="text-4xl font-bold text-white drop-shadow-lg text-center flex-1"
              style={{ 
                textShadow: '2px 2px 0px #000',
                fontFamily: 'Comic Sans MS, cursive'
              }}>
            НАСТРОЙКИ
          </h1>
        </div>

        {/* Settings Tabs */}
        <Card className="bg-white bg-opacity-95 border-4 border-gray-400 shadow-2xl">
          <CardContent className="p-6">
            <Tabs defaultValue="sound" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="sound" className="text-lg font-bold">Звук</TabsTrigger>
                <TabsTrigger value="controls" className="text-lg font-bold">Управление</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sound" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Volume2" size={24} className="text-blue-600" />
                      <span className="text-lg font-semibold">Музыка</span>
                    </div>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">ВКЛ</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Speaker" size={24} className="text-blue-600" />
                      <span className="text-lg font-semibold">Звуковые эффекты</span>
                    </div>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">ВКЛ</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="controls" className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Icon name="Smartphone" size={24} className="mr-2 text-green-600" />
                      Управление на телефоне
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Тап по экрану - прыжок</p>
                      <p>• Свайп вниз - подскользнуть</p>
                      <p>• Двойной тап - особая способность</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Icon name="Keyboard" size={24} className="mr-2 text-blue-600" />
                      Управление на компьютере
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Пробел - прыжок</p>
                      <p>• Стрелка вниз - подскользнуть</p>
                      <p>• Shift - особая способность</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Main render logic
  if (currentView === 'shop') return renderShop();
  if (currentView === 'leaderboard') return renderLeaderboard();
  if (currentView === 'settings') return renderSettings();
  return renderMainMenu();
};

export default Index;