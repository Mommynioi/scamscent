'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ClickyGame() {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [resultKey, setResultKey] = useState(0); // For triggering animations
  const [isFirstClick, setIsFirstClick] = useState(true); // Track if this is the user's first click

  // Fake malware download state
  const [showDownload, setShowDownload] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadPosition, setDownloadPosition] = useState<React.CSSProperties>(
    { top: '20px', right: '20px' }
  );
  const [showJoke, setShowJoke] = useState(false);

  const handleClick = () => {
    if (isOnCooldown) return;

    // Generate result immediately (25% win, 75% nothing)
    const isWin = Math.random() < 0.25;

    if (isWin) {
      const winMessages = [
        'Mommy loves you!',
        'Cool, cool, cool, cool, cool.',
        'Wow, this could have done anything, you know?',
        'Install successful.',
        'Wow. You really fucked up, you know that?',
        ':3',
        'Well that sealed the deal, dummy.',
        'YESSSSS',
        'Sink4pink!',
        'Lose for mommy <3',
        '<3',
        'Your total hours spent on this app are cute.',
        'Only 4,552 clicks to go!',
        "You're a good boy, you know that?",
        'Clicking makes mommy happy.',
        'Clicking is fun!',
        'Clicking is good for you!',
        'Clicking is good for mommy!',
        'Clicking is good for the environment!',
        'Clicking is good for the world!',
        'Clicking is good for your finances!',
        'Clicking is good for your brain!',
        "Opening Mommy's Throne page..."
      ];

      const randomMessage =
        winMessages[Math.floor(Math.random() * winMessages.length)];
      setResult(randomMessage);

      // Open Throne page if that's the selected message
      if (randomMessage === "Opening Mommy's Throne page...") {
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.open(
              'https://throne.com/mommynioi',
              '_blank',
              'noopener,noreferrer'
            );
          }
        }, 1000); // Delay so user can see the message first
      }
    } else {
      setResult('Nothing happened, maybe try it again?');
    }

    // Increment key to trigger animation
    setResultKey((prev) => prev + 1);

    // Start cooldown
    setIsOnCooldown(true);
    setCooldownTime(3);

    // Always trigger fake download on first click, then 10% chance on subsequent clicks
    const triggerDownload = isFirstClick || Math.random() < 0.1;
    if (triggerDownload) {
      startFakeDownload();
    }

    // Mark that first click has occurred
    if (isFirstClick) {
      setIsFirstClick(false);
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsOnCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startFakeDownload = () => {
    setShowDownload(true);
    setDownloadProgress(0);
    setShowJoke(false);
    setDownloadPosition({
      top: '20px',
      right: '20px',
      left: 'auto',
      bottom: 'auto'
    });

    // Progress timer - fills up over 5 seconds
    const progressTimer = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setShowJoke(true);

          // Fade away after showing joke
          setTimeout(() => {
            setShowDownload(false);
            setShowJoke(false);
          }, 2000);

          return 100;
        }
        return prev + 2; // 2% every 100ms = 5 seconds total
      });
    }, 100);
  };

  const handleCloseHover = () => {
    // Jump to random position when hovering over X
    const positions: React.CSSProperties[] = [
      { top: '20px', left: '20px', right: 'auto', bottom: 'auto' },
      { bottom: '20px', right: '20px', top: 'auto', left: 'auto' },
      { bottom: '20px', left: '20px', top: 'auto', right: 'auto' },
      {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        right: 'auto',
        bottom: 'auto'
      },
      { top: '20px', right: '200px', left: 'auto', bottom: 'auto' },
      { top: '200px', right: '20px', left: 'auto', bottom: 'auto' }
    ];

    const randomPosition =
      positions[Math.floor(Math.random() * positions.length)];
    setDownloadPosition(randomPosition);
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center p-8'>
      {/* Button Container - Centered */}
      <div className='flex flex-col items-center space-y-8'>
        {/* Main Click Button */}
        <Button
          onClick={handleClick}
          disabled={isOnCooldown}
          className={`h-32 w-64 rounded-xl text-2xl font-bold transition-all duration-300 ${
            isOnCooldown
              ? 'cursor-not-allowed bg-gray-600 opacity-50'
              : 'bg-pink-600 shadow-lg hover:scale-105 hover:bg-pink-700 hover:shadow-pink-500/50 active:scale-95'
          } `}
        >
          {isOnCooldown ? (
            <span className='text-lg'>{cooldownTime}s</span>
          ) : (
            'Click Me! 💕'
          )}
        </Button>

        {/* Result Display - Fixed space below button */}
        <div className='flex h-20 items-center justify-center'>
          {result && (
            <div
              key={resultKey}
              className={`max-w-md animate-[fadeInBounce_0.5s_ease-out] rounded-lg border-2 p-6 text-center ${
                result !== 'Nothing happened, maybe try it again?'
                  ? 'border-green-500 bg-green-900/50 text-green-300'
                  : 'border-gray-500 bg-gray-900/50 text-gray-300'
              } `}
            >
              <p className='text-xl font-semibold'>{result}</p>
            </div>
          )}
        </div>
      </div>

      {/* Fake Malware Download Panel */}
      {showDownload && (
        <div
          className={`fixed z-50 w-80 rounded-lg border border-gray-600 bg-gray-800 p-4 shadow-2xl transition-all duration-200 ease-in-out ${showJoke ? 'opacity-50' : 'opacity-100'} `}
          style={downloadPosition}
        >
          {/* Header */}
          <div className='mb-3 flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <div className='h-4 w-4 animate-pulse rounded-full bg-red-500'></div>
              <span className='text-sm font-semibold text-white'>
                {showJoke ? 'j/k 😄' : 'Nioiware Downloading...'}
              </span>
            </div>
            {!showJoke && (
              <button
                className='flex h-6 w-6 items-center justify-center text-lg font-bold text-red-400 hover:text-red-300'
                onMouseEnter={handleCloseHover}
              >
                ×
              </button>
            )}
          </div>

          {!showJoke && (
            <>
              {/* File info */}
              <div className='mb-2 text-xs text-gray-300'>
                <div>📁 definitely_not_malware.exe</div>
                <div>💾 {Math.floor(downloadProgress * 2.4)}MB / 240MB</div>
              </div>

              {/* Progress bar */}
              <div className='mb-2 h-4 w-full rounded-full bg-gray-700'>
                <div
                  className='flex h-4 items-center justify-end rounded-full bg-green-500 pr-2 transition-all duration-100 ease-linear'
                  style={{ width: `${downloadProgress}%` }}
                >
                  <span className='text-xs font-bold text-white'>
                    {Math.round(downloadProgress)}%
                  </span>
                </div>
              </div>

              {/* Speed and time remaining */}
              <div className='flex justify-between text-xs text-gray-400'>
                <span>📡 {(Math.random() * 10 + 5).toFixed(1)} MB/s</span>
                <span>
                  ⏱️ {Math.max(0, Math.floor((100 - downloadProgress) / 20))}s
                  remaining
                </span>
              </div>
            </>
          )}

          {showJoke && (
            <div className='animate-bounce text-center text-lg font-bold text-pink-300'>
              Gotcha! 🤭
            </div>
          )}
        </div>
      )}
    </div>
  );
}
