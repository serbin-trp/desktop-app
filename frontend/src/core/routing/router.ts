export type BaseRoute = {
  title: string;
  path: string;
  component: any;
  sidebar: boolean;
  icon?: string;
  children?: Array<BaseRoute>;
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
    sidebar: true,
    component: () =>
      import('@modules/statistics').then((s) => s.StatisticsPageComponent),
  },
  {
    title: 'Documents',
    icon: 'lucideFile',
    path: 'documents',
    sidebar: true,
    component: () =>
      import('@modules/documents').then((s) => s.DocumentsPageComponent),
  },
  {
    title: 'Create Document',
    path: 'documents/create',
    sidebar: false,
    component: () =>
      import('@modules/documents').then((s) => s.CreateDocumentPageComponent),
  },

  {
    title: 'Clients',
    icon: 'lucideLaugh',
    path: 'clients',
    sidebar: true,
    component: () =>
      import('@modules/clients').then((s) => s.ClientsPageComponent),
  },
  {
    title: 'Edit client',
    path: 'clients/edit/:id',
    sidebar: false,
    component: () =>
      import('@modules/clients').then((s) => s.EditClientPageComponent),
  },
];
