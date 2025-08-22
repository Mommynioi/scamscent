import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/layout/header';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='h-full overflow-hidden bg-transparent'>
        <div className='flex h-full w-full flex-col'>
          <Header />
          <main className='flex-1 overflow-auto'>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
