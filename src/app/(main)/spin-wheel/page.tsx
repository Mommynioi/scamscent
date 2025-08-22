'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function SpinWheelPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const punishments = [
    'Send Mommy $20',
    "Like 15 of Mommy's Posts",
    'Tweet this',
    'Buy a gift for Mommy',
    'Pretty link to click',
    'Two more spins!',
    'Good girl!'
  ];

  const colors = [
    '#FF6B9D', // All pink variations for visual variety
    '#FF8FA3',
    '#FFB3C1',
    '#FF6B9D',
    '#E91E63',
    '#FF1744',
    '#C2185B'
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Random number of full rotations (3-6) plus final position
    const spins = Math.floor(Math.random() * 4) + 3;
    const finalRotation = Math.floor(Math.random() * 360);
    const totalRotation = rotation + spins * 360 + finalRotation;

    // Set rotation and wait for animation to complete
    setRotation(totalRotation);

    setTimeout(() => {
      // Calculate which punishment based on where the arrow points
      // The arrow points up (0 degrees), segments now start from top
      const segmentAngle = 360 / punishments.length;

      // Get the final angle after all rotations
      const finalAngle = totalRotation % 360;

      // Since segments are positioned starting from top and we rotate clockwise
      // we need to reverse the rotation to see which segment ends up at arrow
      const adjustedAngle = (360 - finalAngle) % 360;
      const selectedIndex =
        Math.floor(adjustedAngle / segmentAngle) % punishments.length;

      setResult(punishments[selectedIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className='flex h-full w-full flex-col'>
      {/* Header */}
      <div className='flex flex-shrink-0 items-center justify-center py-6'>
        <h1 className='text-center font-[family-name:var(--font-rise-and-shine)] text-3xl text-white drop-shadow-2xl lg:text-4xl xl:text-5xl'>
          Mommy's Punishment Wheel
        </h1>
      </div>

      {/* Main Content Area */}
      <div className='relative flex flex-1 flex-col overflow-hidden lg:flex-row'>
        {/* Wheel Container */}
        <div className='flex flex-1 items-center justify-center p-4'>
          <div className='relative'>
            {/* Wheel - Enhanced sizing for 4K displays */}
            <div className='relative h-[60vh] max-h-[90vw] w-[60vh] max-w-[90vw] lg:h-[80vh] lg:max-h-[80vw] lg:w-[80vh] lg:max-w-[80vw]'>
              <svg
                width='100%'
                height='100%'
                viewBox='0 0 320 320'
                className='transition-transform duration-3000 ease-out'
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {punishments.map((punishment, index) => {
                  // Start from -90 degrees so first segment is at the top (where arrow points)
                  const angle = (360 / punishments.length) * index - 90;
                  const nextAngle =
                    (360 / punishments.length) * (index + 1) - 90;
                  const midAngle = (angle + nextAngle) / 2;

                  // Convert to radians for calculations
                  const startAngleRad = (angle * Math.PI) / 180;
                  const endAngleRad = (nextAngle * Math.PI) / 180;
                  const midAngleRad = (midAngle * Math.PI) / 180;

                  // Calculate path for each segment
                  const radius = 150;
                  const centerX = 160;
                  const centerY = 160;

                  const x1 = centerX + radius * Math.cos(startAngleRad);
                  const y1 = centerY + radius * Math.sin(startAngleRad);
                  const x2 = centerX + radius * Math.cos(endAngleRad);
                  const y2 = centerY + radius * Math.sin(endAngleRad);

                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 0 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');

                  // Text position
                  const textRadius = 100;
                  const textX = centerX + textRadius * Math.cos(midAngleRad);
                  const textY = centerY + textRadius * Math.sin(midAngleRad);

                  return (
                    <g key={index}>
                      <path
                        d={pathData}
                        fill={colors[index]}
                        stroke='#ffffff'
                        strokeWidth='4'
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill='white'
                        fontSize='8'
                        fontWeight='bold'
                        textAnchor='middle'
                        dominantBaseline='middle'
                        transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                      >
                        <tspan x={textX} dy='-4'>
                          {punishment.split(' ').slice(0, 2).join(' ')}
                        </tspan>
                        <tspan x={textX} dy='8'>
                          {punishment.split(' ').slice(2).join(' ')}
                        </tspan>
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Pointer - At top but pointing downward */}
              <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 transform'>
                <div className='h-0 w-0 border-t-16 border-r-8 border-l-8 border-t-white border-r-transparent border-l-transparent'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Result Modal Overlay */}
        {result && (
          <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'>
            <div className='mx-4 w-full max-w-md rounded-2xl border border-pink-500/50 bg-gradient-to-br from-purple-900 to-pink-900 p-8 shadow-2xl'>
              <div className='text-center'>
                <h2 className='mb-4 text-3xl font-bold text-white'>
                  Your Task:
                </h2>
                <p className='mb-6 text-xl font-semibold text-pink-300'>
                  {result === 'Click this link: bit.ly/clicktocum'
                    ? 'Special Task for You'
                    : result}
                </p>

                {/* Task-specific actions */}
                <div className='space-y-4'>
                  {result === 'Send Mommy $20' && (
                    <a
                      href='https://throne.com/mommynioi'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700'
                    >
                      Send to Throne 💰
                    </a>
                  )}

                  {result === 'Buy a gift for Mommy' && (
                    <a
                      href='https://throne.com/mommynioi'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700'
                    >
                      View Wishlist 🎁
                    </a>
                  )}

                  {result === "Like 15 of Mommy's Posts" && (
                    <a
                      href='https://www.x.com/scamscent'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700'
                    >
                      Go to X/Twitter 💕
                    </a>
                  )}

                  {result === 'Pretty link to click' && (
                    <a
                      href='https://bit.ly/clicktocum'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block rounded-lg bg-pink-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-pink-700'
                    >
                      click me
                    </a>
                  )}

                  {result === 'Two more spins!' && (
                    <button
                      onClick={() => {
                        setResult(null);
                        setTimeout(() => spinWheel(), 100);
                      }}
                      className='block w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700'
                    >
                      Spin Again! 🎡
                    </button>
                  )}

                  {result === 'Good girl!' && (
                    <div className='text-lg text-green-300'>
                      🎉 Good girls should spin again! 🎉
                    </div>
                  )}

                  {result === 'Tweet this' && (
                    <div className='text-center'>
                      <a
                        target='_blank'
                        href='https://ctt.ac/N3d8_'
                        className='inline-block'
                      >
                        <img
                          src='http://clicktotweet.com/img/tweet-graphic-4.png'
                          alt='Tweet: NGMHHNNGG 🥵😵‍💫😵‍💫 I let Mommy Nioi take complete control of my account 😵‍💫 Anything for ONE more sniff of @scamscent 🌸 🌸 Surrender your account: bit.ly/clicktocum'
                          className='h-auto max-w-full'
                        />
                      </a>
                    </div>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={() => setResult(null)}
                  className='mt-6 rounded-lg bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rules Panel - Right Side on Desktop, Bottom on Mobile */}
        <div className='flex w-full flex-col space-y-6 border-pink-500/30 p-6 lg:w-80 lg:border-l'>
          {/* Spin Button */}
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            className='rounded-xl bg-pink-600 px-8 py-6 text-2xl text-white hover:bg-pink-700'
          >
            {isSpinning ? 'Spinning...' : 'Spin the Wheel! 🎯'}
          </Button>

          {/* Instructions */}
          <Card className='border-purple-500/30 bg-black/20 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='text-center text-xl text-white'>
                Rules & Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p>• Click the spin button to start the wheel</p>
              <p>• Complete the task you land on</p>
              <p>• Good pets always obey their tasks 💕</p>
              <p>• Some tasks have special actions</p>
              <p>• Have fun and be a good girl!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
