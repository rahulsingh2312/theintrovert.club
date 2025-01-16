import React, { useState, useEffect } from "react";
import {
  Send,
  Twitter,
  Instagram,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import "./index.css";
import { IoCopyOutline } from "react-icons/io5";

const CrowdMovementApp = () => {
  // Media query hook to detect screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Get actual screen dimensions
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [blueBall, setBlueBall] = useState({ x: 0, y: 0 });

  // Dynamic number of balls based on screen size
  const DESKTOP_BALL_COUNT = 400;
  const MOBILE_BALL_COUNT = 200;

  // Initialize red balls based on screen size
  const [redBalls, setRedBalls] = useState(
    Array.from(
      { length: isMobile ? MOBILE_BALL_COUNT : DESKTOP_BALL_COUNT },
      (_, index) => ({
        id: index,
        originalX: Math.random() * screenWidth - screenWidth / 2,
        originalY: Math.random() * screenHeight - screenHeight / 2,
        x: Math.random() * screenWidth - screenWidth / 2,
        y: Math.random() * screenHeight - screenHeight / 2,
      })
    )
  );

  // Update screen dimensions and mobile status on resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newIsMobile = newWidth <= 768;

      setScreenWidth(newWidth);
      setScreenHeight(window.innerHeight);
      setIsMobile(newIsMobile);

      // Regenerate balls when switching between mobile and desktop
      if (newIsMobile !== isMobile) {
        const newBallCount = newIsMobile
          ? MOBILE_BALL_COUNT
          : DESKTOP_BALL_COUNT;
        setRedBalls(
          Array.from({ length: newBallCount }, (_, index) => ({
            id: index,
            originalX: Math.random() * newWidth - newWidth / 2,
            originalY:
              Math.random() * window.innerHeight - window.innerHeight / 2,
            x: Math.random() * newWidth - newWidth / 2,
            y: Math.random() * window.innerHeight - window.innerHeight / 2,
          }))
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const REPULSION_STRENGTH = 200;
  const INTERACTION_DISTANCE = 200;
  const ESCAPE_SPEED = 10;
  const RETURN_SPEED = 0.1;

  const calculateDistance = (ball1, ball2) => {
    return Math.sqrt(
      Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2)
    );
  };

  const updateRedBallPositions = (newBlueBallPosition) => {
    return redBalls.map((redBall) => {
      const distance = calculateDistance(newBlueBallPosition, redBall);

      if (distance < INTERACTION_DISTANCE) {
        const dx = redBall.x - newBlueBallPosition.x;
        const dy = redBall.y - newBlueBallPosition.y;

        const length = Math.sqrt(dx * dx + dy * dy);
        const escapeX =
          (dx / length) * (REPULSION_STRENGTH / (distance + 1)) * ESCAPE_SPEED;
        const escapeY =
          (dy / length) * (REPULSION_STRENGTH / (distance + 1)) * ESCAPE_SPEED;

        return {
          ...redBall,
          x: redBall.x + escapeX,
          y: redBall.y + escapeY,
        };
      }

      return {
        ...redBall,
        x: redBall.x + (redBall.originalX - redBall.x) * RETURN_SPEED,
        y: redBall.y + (redBall.originalY - redBall.y) * RETURN_SPEED,
      };
    });
  };

  const moveBlueBall = (dx, dy) => {
    const newPosition = {
      x: Math.max(Math.min(blueBall.x + dx, screenWidth / 2), -screenWidth / 2),
      y: Math.max(
        Math.min(blueBall.y + dy, screenHeight / 2),
        -screenHeight / 2
      ),
    };

    setBlueBall(newPosition);
    setRedBalls(updateRedBallPositions(newPosition));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          moveBlueBall(0, -20);
          break;
        case "ArrowDown":
        case "s":
          moveBlueBall(0, 20);
          break;
        case "ArrowLeft":
        case "a":
          moveBlueBall(-20, 0);
          break;
        case "ArrowRight":
        case "d":
          moveBlueBall(20, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveBlueBall]);

  useEffect(() => {
    moveBlueBall(0, 0);
  }, []);

  const handleCopy = () => {
    const textElement = document.querySelector(".ca");

    if (textElement) {
      const textToCopy = textElement.textContent || textElement.innerText;

      // Copy the text to the clipboard
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          console.log("Text copied to clipboard!");
          alert("Text copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy text.");
        }
      );
    } else {
      console.warn("No element with the class 'ca' found.");
      alert("No text found to copy!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative w-full h-screen bg-white overflow-hidden"
        style={{ width: screenWidth, height: screenHeight }}
      >
        <div className="flex py-3 w-fit mx-auto  mt-2 rounded-full bg-black border-black bg-opacity-60 backdrop-blur-sm justify-center relative z-50">
          <div className=" px-4 flex gap-44 max-md:gap-20 max-sm:gap-4 items-center justify-between">
            {/* Title Section */}
            {/* g */}
            <div className="flex items-center space-x-3">
              <img src="/$Introvert.png" alt="" className="h-6" />
              {/* <p className="md:text-xs text-[px] text-white">ur7bsozWmLohyVwc2UHGbLNiRwdz5GQ4i7eBACcpump</p> */}
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <a
                href="https://t.me/theintrovertclub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-110"
              >
                <Send size={16} />
              </a>
              <a
                href="https://x.com/introvertedcto"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition transform hover:scale-110"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://www.instagram.com/the_introvertclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-400 text-white rounded-full hover:bg-gray-800 transition transform hover:scale-110"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
        {/* Blue Ball (Movable) */}

        <div className="bg-white flex gap-2 relative z-30 rounded-2xl border max-sm:m-2 max-sm:scale-75 border-gray-400 shadow-xl m-10 from-white to-gray-300 bg-opacity-50 backdrop-blur-md w-96 p-4">
          <img
            src="/introvertGuy.jpg"
            className="relative z-30 h-32 rounded-full border-black border-4"
            alt=""
          />
          <div className="flex-col gap-2">
            <h1 className="font-medium">
              Name: <img src="/$Introvert.png" className="invert w-44" alt="" />
            </h1>
            <h1 className="flex-col font-medium mt-3">
              Strength:{" "}
              <div>
                <span className="text-xs px-2 py-1 bg-gradient-to-b from-white to-gray-200 border-gray-400 rounded-lg border text-black">
                  Trading
                </span>{" "}
                <span className="text-xs px-2 py-1 bg-gradient-to-b from-white to-gray-200 border-gray-400 rounded-lg border text-black">
                  Repel Humans
                </span>
              </div>
            </h1>
          </div>
        </div>
        <div className="bg-white overflow-clip flex gap-2 justify-between relative z-30 rounded-2xl border max-sm:m-2 max-sm:scale-75 border-gray-400 shadow-xl ml-10 -mt-6 from-white to-gray-300 bg-opacity-50 backdrop-blur-md w-96 p-4">
          <p className="text-xs font-medium ca">
            2i2zQxCCx2xGeLSZZVPwyknQVX5SvxudXbBDttKVpump
          </p>
          <IoCopyOutline className="cursor-pointer" onClick={handleCopy} />
        </div>

        <img
          src="/guy3.png"
          alt="blue character"
          className="absolute w-14 rounded-full ease-out duration-300 object-cover cursor-pointer "
          onMouseOver={() => setCharacterCard(true)}
          onMouseOut={() => setCharacterCard(false)}
          style={{
            left: `calc(50% + ${blueBall.x}px - 32px)`,
            top: `calc(50% + ${blueBall.y}px - 32px)`,
          }}
        />

        {/* Red Balls (Repelling) */}
        {redBalls.map((ball) => (
          <img
            key={ball.id}
            src="/guy3.png"
            alt="red character"
            className="absolute w-8 rounded-full max-sm:ease-out"
            style={{
              left: `calc(50% + ${ball.x}px - 24px)`,
              top: `calc(50% + ${ball.y}px - 24px)`,
            }}
          />
        ))}

        <div className="fixed bottom-0 left-0 right-0 pb-6 z-20">
          <div className="flex-col flex mx-auto items-center bg-black bg-opacity-60 backdrop-blur-sm text-white font-medium rounded-full border space-y-2 max-w-fit px-4 py-1 max-md:hidden">
            Use WASD or Arrow keys to move
          </div>
          <div className="flex-col flex mx-auto items-center space-y-2 max-w-[600px] md:hidden">
            <button
              onClick={() => moveBlueBall(0, -20)}
              className="p-3 bg-black bg-opacity-40 backdrop-blur-md text-white rounded-full w-fit hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronUp size={24} />
            </button>
            <div className="flex space-x-16">
              <button
                onClick={() => moveBlueBall(-20, 0)}
                className="p-3 bg-black bg-opacity-40 backdrop-blur-md text-white rounded-full w-fit hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => moveBlueBall(20, 0)}
                className="p-3 bg-black bg-opacity-40 backdrop-blur-md text-white rounded-full w-fit hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <button
              onClick={() => moveBlueBall(0, 20)}
              className="p-3 bg-black bg-opacity-40 backdrop-blur-md text-white rounded-full w-fit hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdMovementApp;
