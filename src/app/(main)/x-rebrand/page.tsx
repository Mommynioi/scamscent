'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function XRebrandPage() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.open('https://bit.ly/clicktocum', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-8'>
      <div className='w-full max-w-2xl space-y-8 text-center'>
        {/* Header */}
        <div className='space-y-4'>
          <h1 className='font-[family-name:var(--font-rise-and-shine)] text-6xl text-white drop-shadow-2xl'>
            X Rebrand
          </h1>
        </div>

        {/* Image */}
        <div className='flex justify-center'>
          <div className='overflow-hidden rounded-lg border-4 border-pink-500/30 shadow-2xl'>
            <Image
              src='/assets/pfp3.png'
              alt='X Rebrand'
              width={400}
              height={400}
              className='h-auto w-full max-w-md'
              priority
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className='space-y-6'>
          <p className='text-lg font-semibold text-white'>
            Click this to let Mommy take control of your X account
          </p>

          <Button
            onClick={handleClick}
            className='rounded-xl bg-pink-600 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-pink-700 hover:shadow-pink-500/50 active:scale-95'
          >
            Give Mommy Control 💖
          </Button>
        </div>

        {/* Disclaimer */}
        <div className='mt-8 text-sm text-pink-200/80'>
          <p>
            ✨ This will change your PFP, Banner, & Bio marking you as Mommy's
            property for all to see! ✨
          </p>
        </div>
      </div>
    </div>
  );
}
