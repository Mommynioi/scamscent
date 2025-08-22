import { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Games - Nioi's Pinkspace",
  description: 'Fun games to play in my digital realm~'
};

export default function GamesPage() {
  const games = [
    {
      id: 'clicky',
      title: '🎮 Clicky Game',
      description: 'Click the button and test your luck! 25% chance to win.',
      difficulty: 'Easy',
      color: 'from-pink-600 to-rose-600'
    }
  ];

  return (
    <div className='min-h-screen p-8'>
      <div className='mx-auto max-w-6xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-5xl font-bold text-white'>🎮 Game Hub</h1>
          <p className='text-xl text-pink-300'>
            Choose your adventure in Nioi&apos;s Pinkspace~
          </p>
        </div>

        {/* Games Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {games.map((game) => (
            <Card
              key={game.id}
              className='group border-pink-500/30 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105'
            >
              <CardHeader>
                <div
                  className={`h-32 w-full bg-gradient-to-r ${game.color} mb-4 flex items-center justify-center rounded-lg`}
                >
                  <span className='text-4xl'>{game.title.split(' ')[0]}</span>
                </div>
                <CardTitle className='text-xl text-white transition-colors group-hover:text-pink-300'>
                  {game.title}
                </CardTitle>
                <CardDescription className='text-gray-300'>
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-400'>Difficulty:</span>
                  <span
                    className={`text-sm font-semibold ${
                      game.difficulty === 'Easy'
                        ? 'text-green-400'
                        : game.difficulty === 'Medium'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                    }`}
                  >
                    {game.difficulty}
                  </span>
                </div>
                <Link href={`/games/${game.id}`}>
                  <Button className='w-full bg-pink-600 text-white hover:bg-pink-700'>
                    Play Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <div className='mt-12 text-center'>
          <div className='rounded-xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm'>
            <h2 className='mb-4 text-2xl font-bold text-white'>
              More Games Coming Soon!
            </h2>
            <p className='text-gray-300'>
              I&apos;m always working on new fun games for my pets to enjoy~
              Stay tuned for more interactive experiences!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
