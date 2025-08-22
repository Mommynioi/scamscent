export default function HomeViewSimple() {
  return (
    <div className='flex h-full flex-col'>
      {/* Welcome Header */}
      <div className='flex-shrink-0 py-6 text-center md:py-10'>
        <h1 className='font-[family-name:var(--font-rise-and-shine)] text-4xl text-white drop-shadow-2xl md:text-5xl'>
          Mommy Nioi
        </h1>
        <p className='mt-2 text-base font-light text-pink-300 md:mt-3 md:text-lg'>
          🌸 Your addictive pheromone princess 🌸
        </p>
      </div>

      {/* Image Cards Section - Responsive Layout */}
      <div className='flex flex-1 items-center justify-center px-4 pb-6 md:px-8 md:pb-8'>
        <div className='w-full max-w-sm md:max-w-4xl'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
            {/* Throne - Spoil Me Image Card */}
            <a
              href='https://throne.com/mommynioi'
              target='_blank'
              rel='noopener noreferrer'
              className='group block'
            >
              <div className='relative aspect-[2/1] overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105'>
                <img
                  src='/assets/throne.png'
                  alt='Throne - Buy me cute little gifts'
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </a>

            {/* Twitter/X Social Hub Image Card */}
            <a
              href='https://www.x.com/scamscent'
              target='_blank'
              rel='noopener noreferrer'
              className='group block'
            >
              <div className='relative aspect-[2/1] overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105'>
                <img
                  src='/assets/twitter.png'
                  alt='Follow me on X (Twitter)'
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </a>

            {/* iWantClips Gallery Image Card */}
            <a
              href='https://iwantclips.com/store/1814450/BrattyNioi'
              target='_blank'
              rel='noopener noreferrer'
              className='group block'
            >
              <div className='relative aspect-[2/1] overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105'>
                <img
                  src='/assets/iwantclips.png'
                  alt='iWantClips - BrattyNioi Store'
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </a>

            {/* SinkSync Beta Image Card */}
            <a
              href='https://sinksync.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group block'
            >
              <div className='relative aspect-[2/1] overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105'>
                <img
                  src='/assets/sinksync.png'
                  alt='SinkSync - Revolutionary Platform'
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
