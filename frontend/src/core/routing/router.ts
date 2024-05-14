export type BaseRoute = {
  title: string;
  icon: string;
  path: string;
  component: any;
};

export type SidebarRoute = {
  title: string;
  icon: string;
  path: string;
};

export const routes: BaseRoute[] = [
  {
    title: 'Dashboard',
    icon: 'lucideBarChart2',
    path: '',
    component: () =>
      import('@modules/statistics').then((s) => s.StatisticsPageComponent),
  },
  {
    title: 'Documents',
    icon: 'lucideFile',
    path: 'documents',
    component: () =>
      import('@modules/documents').then((s) => s.DocumentsPageComponent),
  },
];
