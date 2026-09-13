import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/book-list/book-list.component').then(m => m.BookListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'books/add',
    loadComponent: () => import('./components/book-form/book-form.component').then(m => m.BookFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'books/edit/:id',
    loadComponent: () => import('./components/book-form/book-form.component').then(m => m.BookFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'quotes',
    loadComponent: () => import('./components/quote-list/quote-list.component').then(m => m.QuoteListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'quotes/add',
    loadComponent: () => import('./components/quote-form/quote-form.component').then(m => m.QuoteFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'quotes/edit/:id',
    loadComponent: () => import('./components/quote-form/quote-form.component').then(m => m.QuoteFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { path: '**', redirectTo: '' }
];
