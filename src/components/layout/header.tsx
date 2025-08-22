'use client';
import React from 'react';
import { useSidebar } from '../ui/sidebar';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className='px-4 pt-3'>
      <Button
        onClick={toggleSidebar}
        className='h-10 w-10 bg-pink-600 text-white hover:bg-pink-700'
        size='icon'
        aria-label='Toggle Sidebar'
      >
        <Menu className='h-6 w-6' />
      </Button>
    </header>
  );
}
