import { lazy, ComponentType } from 'react';

const Home = lazy(() => import('../../pages/Home/Home'));

export interface Route {
  path: string;
  name: string;
  component: ComponentType;
  authenticatedRoute?: boolean;
}

export const routes: Route[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];
