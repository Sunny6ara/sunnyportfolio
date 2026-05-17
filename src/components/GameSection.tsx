import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Play, RotateCcw, Smartphone } from 'lucide-react';

// -----------------------------------------------------------------
// Retro Nokia Cricket Game Engine
// -----------------------------------------------------------------
const NokiaCricketGame = ({ 
  isPlaying, 
  onScore,
  onWicket,
  gameKey
}: { 
  isPlaying: boolean, 
  onScore: (runs: number) => void,
  onWicket: () => void,
  gameKey: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Nokia 3310 screen size: 84x48
    // We scale it in CSS using image-rendering: pixelated
    const width = 84;
    const height = 48;
    canvas.width = width;
    canvas.height = height;

    const NOKIA_BG = '#8dbd24'; // Classic Nokia Green
    const NOKIA_FG = '#111111'; // Classic Nokia Black pixels

    // Game state
    let ball = { x: 42, y: 10, speed: 1.5, active: false };
    let bowler = { x: 42, y: 5 };
    let batsman = { x: 42, y: 40, isSwinging: false, swingTimer: 0 };
    let message = "TAP TO BOWL";
    let messageTimer = 0;
    
    let lastTime = performance.now();
    let animationFrameId: number;

    const drawPixel = (x: number, y: number, w=1, h=1) => {
      ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
    };
    
    const drawSprite = (x: number, y: number, sprite: number[][]) => {
      sprite.forEach((row, rIdx) => {
        row.forEach((col, cIdx) => {
          if (col === 1) drawPixel(x + cIdx, y + rIdx);
        });
      });
    };

    // Simple pixel sprites
    const batIdle = [
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [1,1,1]
    ];
    
    const batSwing = [
      [1,1,1,1],
      [0,0,0,1],
      [0,0,0,0],
      [1,1,1,0]
    ];
    
    const bowlerSprite = [
      [0,1,0],
      [1,1,1],
      [0,1,0],
      [1,0,1]
    ];

    const resetBall = () => {
      ball.active = false;
      ball.y = 10;
      ball.x = 40 + Math.random() * 4;
      // Randomize speed slightly for difficulty
      ball.speed = 1.0 + Math.random() * 1.5;
    };

    const draw = () => {
      // Clear background
      ctx.fillStyle = NOKIA_BG;
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = NOKIA_FG;
      
      // Draw Pitch lines
      for(let i=5; i<45; i+=4) {
          drawPixel(35, i, 1, 2);
          drawPixel(49, i, 1, 2);
      }
      
      // Draw Bowler
      drawSprite(bowler.x - 1, bowler.y, bowlerSprite);
      
      // Draw Batsman
      if (batsman.isSwinging) {
        drawSprite(batsman.x - 2, batsman.y, batSwing);
      } else {
        drawSprite(batsman.x - 1, batsman.y, batIdle);
      }
      
      // Draw Ball
      if (ball.active) {
        drawPixel(ball.x, ball.y, 2, 2);
      }
      
      // Draw Message
      if (message && messageTimer > 0) {
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Background for text
        ctx.fillStyle = NOKIA_BG;
        ctx.fillRect(0, height / 2 - 8, width, 16);
        ctx.fillStyle = NOKIA_FG;
        // Border for text bg
        ctx.fillRect(0, height / 2 - 8, width, 1);
        ctx.fillRect(0, height / 2 + 7, width, 1);
        ctx.fillText(message, width / 2, height / 2);
      }
    };

    const update = (dt: number) => {
      if (messageTimer > 0) {
        messageTimer -= dt;
        if (messageTimer <= 0) {
            message = "";
            if (!ball.active) {
                // If the message was an OUT or RUN message, reset ball for next bowl
                resetBall();
            }
        }
      }

      if (batsman.isSwinging) {
        batsman.swingTimer -= dt;
        if (batsman.swingTimer <= 0) {
          batsman.isSwinging = false;
        }
      }

      if (ball.active && messageTimer <= 0) {
        // Move ball
        ball.y += ball.speed * (dt / 16); // normalize speed to ~60fps
        
        // Check missed ball
        if (ball.y > batsman.y + 4) {
          ball.active = false;
          message = "OUT!";
          messageTimer = 1500;
          onWicket();
        }
      }
    };

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      
      update(dt);
      draw();
      
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleAction = () => {
      if (messageTimer > 0) return; // Prevent action while message is showing

      if (!ball.active) {
        // Bowl the ball
        ball.active = true;
      } else {
        // Swing the bat
        batsman.isSwinging = true;
        batsman.swingTimer = 300; // Swing lasts 300ms
        
        // Hit detection
        if (ball.y > batsman.y - 5 && ball.y < batsman.y + 3) {
          // Hit! Calculate runs based on timing (distance from ideal center point)
          const diff = Math.abs(ball.y - batsman.y);
          let runs = 0;
          if (diff <= 1) runs = 6;
          else if (diff <= 2) runs = 4;
          else runs = 1;
          
          message = `${runs} RUNS!`;
          messageTimer = 1000;
          onScore(runs);
          ball.active = false; // ball hit away
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleAction();
      }
    };
    
    canvas.addEventListener('mousedown', handleAction);
    window.addEventListener('keydown', handleKeyDown);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleAction);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, onScore, onWicket, gameKey]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#8dbd24] p-4 relative overflow-hidden">
        {/* Decorative Nokia Screen Bezel */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-10 rounded-lg"></div>
        {/* Nokia LCD grid overlay effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:4px_4px] z-10 mix-blend-multiply opacity-50"></div>
        
        <canvas 
            ref={canvasRef} 
            className="w-full h-full max-w-[400px] object-contain cursor-pointer relative z-0"
            style={{ imageRendering: 'pixelated' }}
        />
    </div>
  );
};


// -----------------------------------------------------------------
// Main Game Section Component
// -----------------------------------------------------------------
export const GameSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('nokiaCricketHighScore');
    if (savedScore) setHighScore(parseInt(savedScore, 10));
  }, []);

  const startGame = () => {
    setScore(0);
    setWickets(0);
    setGameOver(false);
    setIsPlaying(true);
    setGameKey(k => k + 1);
  };

  const stopGame = () => {
    setIsPlaying(false);
    setGameOver(true);
  };

  useEffect(() => {
      if (gameOver) {
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('nokiaCricketHighScore', score.toString());
          }
      }
  }, [gameOver, score, highScore]);

  const handleWicket = useCallback(() => {
    setWickets(w => {
      const newWickets = w + 1;
      if (newWickets >= 3) {
        setTimeout(stopGame, 1500); // Wait for OUT message to finish
      }
      return newWickets;
    });
  }, []);

  return (
    <section id="play" className="py-24 relative overflow-hidden bg-space-black border-t border-b border-white/5">
      <div className="absolute left-1/2 top-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="text-neon-cyan w-8 h-8" />
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-widest uppercase">
              NOKIA CRICKET
            </h2>
          </div>
          <p className="text-gray-400 max-w-xl text-lg mb-4">
            Take a break from the matrix. Experience the classic mobile cricket simulation.
          </p>
          <div className="flex space-x-8">
            <div className="flex items-center space-x-2 text-neon-cyan font-mono bg-neon-cyan/10 px-4 py-2 rounded-lg border border-neon-cyan/30">
              <span className="text-sm">RUNS:</span>
              <span className="text-xl font-bold">{score}</span>
            </div>
            <div className="flex items-center space-x-2 text-red-500 font-mono bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/30">
              <span className="text-sm">WICKETS:</span>
              <span className="text-xl font-bold">{wickets}/3</span>
            </div>
            <div className="flex items-center space-x-2 text-neon-purple font-mono bg-neon-purple/10 px-4 py-2 rounded-lg border border-neon-purple/30">
              <Trophy className="w-4 h-4" />
              <span className="text-sm">HIGH:</span>
              <span className="text-xl font-bold">{highScore}</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center w-full">
          {/* Game Container Wrapper (Ultra Premium Glossy Phone) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-8 sm:p-10 rounded-[3rem] bg-gradient-to-b from-gray-800 to-black border-[12px] border-gray-900 shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(255,255,255,0.15)] w-full max-w-md aspect-[4/5] overflow-hidden flex flex-col group"
          >
            {/* Glossy Reflection overlay */}
            <div className="absolute -top-10 -left-10 w-[150%] h-[150%] bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-50 transform -skew-x-12 opacity-30 group-hover:opacity-40 transition-opacity"></div>

            {/* Nokia branding area */}
            <div className="text-center font-display text-gray-500 text-sm mb-4 tracking-[0.3em] font-bold shadow-black drop-shadow-md">
                NOKIA
            </div>

            {/* Screen Container */}
            <div className="flex-1 w-full relative rounded-xl overflow-hidden border-[10px] border-[#1a1a1a] bg-[#8dbd24] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                
                {/* CRT overlay effects inside screen */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.6)_100%)] z-20 mix-blend-multiply"></div>
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] z-30 opacity-30"></div>

                <NokiaCricketGame 
                  isPlaying={isPlaying} 
                  onScore={(runs) => setScore(s => s + runs)} 
                  onWicket={handleWicket}
                  gameKey={gameKey}
                />

                {!isPlaying && (
                  <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                    {gameOver && (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-white font-mono text-3xl font-bold mb-6 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      >
                        MATCH OVER<br/>
                        <span className="text-lg text-neon-cyan drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">SCORE: {score}</span>
                      </motion.div>
                    )}
                    <button
                      type="button"
                      onClick={startGame}
                      className="px-8 py-4 bg-[#8dbd24] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] text-[#111111] font-bold font-mono rounded hover:bg-[#a6d833] hover:translate-y-1 hover:shadow-[0px_0px_0px_#111111] transition-all flex items-center space-x-3 active:bg-[#7ba81d]"
                    >
                      {gameOver ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span>{gameOver ? 'PLAY AGAIN' : 'START GAME'}</span>
                    </button>
                  </div>
                )}
            </div>
            
            {/* Fake physical buttons area */}
            <div className="mt-8 flex justify-center items-center space-x-6 relative z-10">
                <div className="w-12 h-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] border border-gray-950"></div>
                <div className="w-16 h-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-[inset_0_2px_5px_rgba(255,255,255,0.2)] border border-gray-950 flex items-center justify-center">
                    <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
                </div>
                <div className="w-12 h-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] border border-gray-950"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400 font-mono text-sm max-w-md bg-black/40 p-4 rounded-lg border border-white/5">
          <p className="mb-2 text-neon-cyan font-bold">CONTROLS</p>
          <p>1. TAP/CLICK to bowl the ball.</p>
          <p>2. TAP/CLICK or PRESS SPACEBAR to swing.</p>
          <p>Time your swing perfectly to hit a SIX!</p>
        </div>
      </div>
    </section>
  );
};
