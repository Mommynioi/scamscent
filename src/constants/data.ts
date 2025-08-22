import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: 'home',
    isActive: false,
    shortcut: ['h', 'h'],
    items: []
  },
  {
    title: 'SinkSync Beta',
    url: '/sinksync',
    icon: 'refresh',
    isActive: false,
    shortcut: ['s', 's'],
    items: []
  },
  {
    title: 'Clicky Game',
    url: '/games/clicky',
    icon: 'mouse',
    isActive: false,
    shortcut: ['c', 'g'],
    items: []
  },
  {
    title: 'Spin Wheel',
    url: '/spin-wheel',
    icon: 'wheel',
    isActive: false,
    shortcut: ['s', 'w'],
    items: []
  },
  {
    title: 'X Rebrand',
    url: '/x-rebrand',
    icon: 'brand-x',
    isActive: false,
    shortcut: ['x', 'r'],
    items: []
  }
];
