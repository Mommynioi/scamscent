export default function HomeViewSimple() {
  return (
    <div className='min-h-screen'>
      {/* Welcome Header */}
      <div className='py-16 text-center'>
        <h1 className='font-[family-name:var(--font-rise-and-shine)] text-6xl text-white drop-shadow-2xl'>
          Mommy Nioi
        </h1>
        <p className='mt-2 text-xl font-light text-pink-300'>
          🌸 Your addictive pheromone princess 🌸
        </p>
      </div>

      {/* 2x2 Grid Image Cards Section */}
      <div className='mx-auto max-w-4xl px-6 pb-8'>
        <div className='grid grid-cols-2 gap-6'>
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
  );
}
