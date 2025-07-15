import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/task-list/task-list').then((m) => m.TaskList),
  },
  {
    path: 'nueva',
    loadComponent: () =>
      import('./components/task-form/task-form').then((m) => m.TaskForm),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/task-form/task-form').then((m) => m.TaskForm),
  },
];
