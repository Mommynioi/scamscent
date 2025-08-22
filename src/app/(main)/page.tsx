import { Metadata } from 'next';
import HomeViewSimple from '@/features/home/components/home-view-simple';

export const metadata: Metadata = {
  title: "Nioi's Pinkspace",
  description: 'Welcome to pinkspace, Cutie!'
};

export default function Page() {
  return <HomeViewSimple />;
}
