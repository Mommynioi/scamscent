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
      <SidebarInset className='overflow-y-auto bg-transparent'>
        <div className='flex min-h-screen flex-col'>
          <Header />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
