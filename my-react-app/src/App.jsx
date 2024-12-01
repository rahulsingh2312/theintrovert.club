import React, { useState, useEffect } from 'react';

const CrowdMovementApp = () => {
  // Get actual screen dimensions
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [blueBall, setBlueBall] = useState({ x: 0, y: 0 });
  const [redBalls, setRedBalls] = useState(
    Array.from({ length: 300 }, (_, index) => ({
      id: index,
      originalX: Math.random() * screenWidth - screenWidth / 2,
      originalY: Math.random() * screenHeight - screenHeight / 2,
      x: Math.random() * screenWidth - screenWidth / 2,
      y: Math.random() * screenHeight - screenHeight / 2
    }))
  );

  // Update screen dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const REPULSION_STRENGTH = 200;
  const INTERACTION_DISTANCE = 150;
  const ESCAPE_SPEED = 10;
  const RETURN_SPEED = 0.1;

  const calculateDistance = (ball1, ball2) => {
    return Math.sqrt(
      Math.pow(ball1.x - ball2.x, 2) + 
      Math.pow(ball1.y - ball2.y, 2)
    );
  };

  const updateRedBallPositions = (newBlueBallPosition) => {
    return redBalls.map(redBall => {
      const distance = calculateDistance(newBlueBallPosition, redBall);
      
      if (distance < INTERACTION_DISTANCE) {
        const dx = redBall.x - newBlueBallPosition.x;
        const dy = redBall.y - newBlueBallPosition.y;
        
        const length = Math.sqrt(dx * dx + dy * dy);
        const escapeX = (dx / length) * (REPULSION_STRENGTH / (distance + 1)) * ESCAPE_SPEED;
        const escapeY = (dy / length) * (REPULSION_STRENGTH / (distance + 1)) * ESCAPE_SPEED;

        return {
          ...redBall,
          x: redBall.x + escapeX,
          y: redBall.y + escapeY
        };
      }
      
      return {
        ...redBall,
        x: redBall.x + (redBall.originalX - redBall.x) * RETURN_SPEED,
        y: redBall.y + (redBall.originalY - redBall.y) * RETURN_SPEED
      };
    });
  };

  const moveBlueBall = (dx, dy) => {
    const newPosition = {
      x: Math.max(Math.min(blueBall.x + dx, screenWidth / 2), -screenWidth / 2),
      y: Math.max(Math.min(blueBall.y + dy, screenHeight / 2), -screenHeight / 2)
    };
    
    setBlueBall(newPosition);
    setRedBalls(updateRedBallPositions(newPosition));
  };

  return (
    <div className="flex flex-col items-center justify-center p-1">
      <div 
        className="relative w-full h-screen bg-white shadow-2xl rounded-2xl border-4 border-gray-300 overflow-hidden"
        style={{ width: screenWidth, height: screenHeight }}
      >
        {/* Blue Ball (Movable) */}
        <img 
          src="/gut.png"
          alt="blue character" 
          className="absolute w-16 h-16 rounded-full"
          style={{
            left: `calc(50% + ${blueBall.x}px - 32px)`,
            top: `calc(50% + ${blueBall.y}px - 32px)`
          }}
        />
        
        {/* Red Balls (Repelling) */}
        {redBalls.map(ball => (
          <img
            key={ball.id}
            src="/gut.png"
            alt="red character"
            className="absolute w-12 h-12 rounded-full"
            style={{
              left: `calc(50% + ${ball.x}px - 24px)`,
              top: `calc(50% + ${ball.y}px - 24px)`
            }}
          />
        ))}

        <div className="fixed bottom-0 left-0 right-0 pb-6 z-20">
          <div className="flex-col flex mx-auto items-center space-y-2 max-w-[600px]">
            <button              
              onClick={() => moveBlueBall(0, -20)}              
              className="p-3 bg-black text-white rounded-full w-24 hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-md"           
            >
              ↑ Up           
            </button>
            <div className="flex space-x-2">
              <button                
                onClick={() => moveBlueBall(-20, 0)}                
                className="p-3 bg-black text-white rounded-full w-24 hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-md"             
              >
                ← Left             
              </button>
              <button                
                onClick={() => moveBlueBall(20, 0)}                
                className="p-3 bg-black text-white rounded-full w-24 hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-md"             
              >
                → Right             
              </button>
            </div>
            <button              
              onClick={() => moveBlueBall(0, 20)}              
              className="p-3 bg-black text-white rounded-full w-24 hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-md"           
            >
              ↓ Down           
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdMovementApp;