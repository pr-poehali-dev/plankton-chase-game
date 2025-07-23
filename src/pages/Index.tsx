import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [coins, setCoins] = useState(1250);
  const [currentView, setCurrentView] = useState('menu');
  const [gameState, setGameState] = useState({
    score: 0,
    spongebobY: 50,
    planktonX: 80,
    items: [],
    gameSpeed: 2,
    isJumping: false,
    explosives: 0
  });
  const gameLoopRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  
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
            onClick={() => setCurrentView('game')}
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

  const renderGame = () => {
    useEffect(() => {
      if (currentView === 'game' && !gameRunning) {
        setGameRunning(true);
        startGame();
      }
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }, [currentView, gameRunning]);

    const startGame = () => {
      // Initialize game items
      const initialItems = [];
      for (let i = 0; i < 10; i++) {
        if (Math.random() > 0.7) {
          initialItems.push({
            id: Math.random(),
            type: Math.random() > 0.5 ? 'coin' : 'explosive',
            x: 100 + i * 150,
            y: Math.random() > 0.5 ? 30 : 70,
            collected: false
          });
        }
      }
      
      setGameState(prev => ({
        ...prev,
        items: initialItems,
        score: 0,
        explosives: 0
      }));

      // Game loop
      gameLoopRef.current = setInterval(() => {
        setGameState(prev => {
          const newItems = prev.items.map(item => ({
            ...item,
            x: item.x - prev.gameSpeed
          })).filter(item => item.x > -50);

          // Add new items
          if (Math.random() > 0.95) {
            newItems.push({
              id: Math.random(),
              type: Math.random() > 0.6 ? 'coin' : 'explosive',
              x: window.innerWidth + 50,
              y: Math.random() > 0.5 ? 30 : 70,
              collected: false
            });
          }

          // Move Plankton
          const newPlanktonX = prev.planktonX + Math.sin(Date.now() / 1000) * 0.5;

          return {
            ...prev,
            items: newItems,
            planktonX: Math.max(75, Math.min(85, newPlanktonX)),
            score: prev.score + 1
          };
        });
      }, 50);
    };

    const jump = () => {
      if (!gameState.isJumping) {
        setGameState(prev => ({ ...prev, isJumping: true, spongebobY: 30 }));
        setTimeout(() => {
          setGameState(prev => ({ ...prev, isJumping: false, spongebobY: 50 }));
        }, 600);
      }
    };

    const collectItem = (itemId, itemType) => {
      setGameState(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.id === itemId ? { ...item, collected: true } : item
        ),
        ...(itemType === 'coin' ? { score: prev.score + 10 } : { explosives: prev.explosives + 1 }),
        ...(itemType === 'coin' && { coins: coins + 1 })
      }));
      if (itemType === 'coin') {
        setCoins(prev => prev + 1);
      }
    };

    const explodePlankton = () => {
      if (gameState.explosives > 0) {
        setGameState(prev => ({
          ...prev,
          explosives: prev.explosives - 1,
          score: prev.score + 100
        }));
        // Add explosion effect
        setTimeout(() => {
          alert('БУМ! Планктон взорван! +100 очков!');
        }, 100);
      }
    };

    return (
      <div 
        className="min-h-screen bg-gradient-to-b from-cyan-300 via-blue-400 to-blue-700 relative overflow-hidden cursor-pointer"
        onClick={jump}
        onKeyDown={(e) => {
          if (e.code === 'Space') {
            e.preventDefault();
            jump();
          }
          if (e.code === 'KeyX' || e.code === 'Enter') {
            explodePlankton();
          }
        }}
        tabIndex={0}
      >
        {/* Game UI */}
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-6">
          <Button 
            onClick={() => {
              setCurrentView('menu');
              setGameRunning(false);
              if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold"
          >
            <Icon name="X" size={20} className="mr-1" />
            Выход
          </Button>
          
          <div className="flex items-center space-x-4 bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={20} className="text-yellow-400" />
              <span className="text-white font-bold">{gameState.score}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Coins" size={20} className="text-yellow-400" />
              <span className="text-white font-bold">{coins}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <img src="/img/1a2d0889-2d42-4f6f-baf1-b212c2b8cfff.jpg" alt="TNT" className="w-5 h-5" />
              <span className="text-white font-bold">{gameState.explosives}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-bold">КЛИК = ПРЫЖОК</p>
          <p className="text-white text-sm font-bold">X = ВЗОРВАТЬ</p>
        </div>

        {/* Ocean floor */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-600 to-yellow-400 border-t-4 border-orange-500" />

        {/* SpongeBob */}
        <div 
          className={`absolute w-20 h-20 transition-all duration-300 z-10 ${
            gameState.isJumping ? 'transform scale-110' : ''
          }`}
          style={{
            left: '10%',
            bottom: `${gameState.spongebobY}px`,
            transform: gameState.isJumping ? 'rotate(-15deg)' : 'rotate(0deg)'
          }}
        >
          <img 
            src="/img/9bb7b3d1-d4dc-4773-a864-cc78b043b220.jpg" 
            alt="SpongeBob" 
            className="w-full h-full rounded-full border-2 border-yellow-400 animate-bounce"
          />
        </div>

        {/* Plankton */}
        <div 
          className="absolute w-16 h-16 z-10"
          style={{
            right: `${100 - gameState.planktonX}%`,
            bottom: '60px'
          }}
        >
          <img 
            src="/img/781012b5-d5a9-4179-9201-03214588a25a.jpg" 
            alt="Plankton" 
            className="w-full h-full rounded-full border-2 border-green-400 animate-pulse"
          />
        </div>

        {/* Game Items */}
        {gameState.items.map((item) => {
          if (item.collected) return null;
          
          // Check collision with SpongeBob
          const spongebobLeft = window.innerWidth * 0.1;
          const spongebobRight = spongebobLeft + 80;
          const spongebobTop = window.innerHeight - gameState.spongebobY - 80;
          const spongebobBottom = window.innerHeight - gameState.spongebobY;
          
          const itemLeft = item.x;
          const itemRight = item.x + 40;
          const itemTop = window.innerHeight - item.y - 40;
          const itemBottom = window.innerHeight - item.y;
          
          if (spongebobLeft < itemRight && spongebobRight > itemLeft &&
              spongebobTop < itemBottom && spongebobBottom > itemTop) {
            setTimeout(() => collectItem(item.id, item.type), 0);
          }
          
          return (
            <div
              key={item.id}
              className={`absolute w-10 h-10 z-10 animate-spin ${
                item.type === 'coin' ? 'bg-yellow-400 rounded-full border-2 border-yellow-600' : ''
              }`}
              style={{
                left: `${item.x}px`,
                bottom: `${item.y}px`
              }}
            >
              {item.type === 'coin' ? (
                <Icon name="Coins" size={40} className="text-yellow-600" />
              ) : (
                <img 
                  src="/img/1a2d0889-2d42-4f6f-baf1-b212c2b8cfff.jpg" 
                  alt="TNT" 
                  className="w-full h-full rounded animate-pulse"
                />
              )}
            </div>
          );
        })}

        {/* Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white bg-opacity-40 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Main render logic
  if (currentView === 'game') return renderGame();
  if (currentView === 'shop') return renderShop();
  if (currentView === 'leaderboard') return renderLeaderboard();
  if (currentView === 'settings') return renderSettings();
  return renderMainMenu();
};

export default Index;