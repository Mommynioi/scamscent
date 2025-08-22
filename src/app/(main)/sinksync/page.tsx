import { Metadata } from 'next';
import SinkSyncPage from '@/components/sinksync-page';

export const metadata: Metadata = {
  title: "SinkSync Beta Access - Nioi's Pinkspace",
  description:
    'Request an invite code to join the exclusive SinkSync beta program'
};

export default function Page() {
  return <SinkSyncPage />;
}
