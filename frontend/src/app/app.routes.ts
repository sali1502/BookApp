import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Boklista | Bok & Citat',
    loadComponent: () => import('./components/book-list/book-list.component').then(m => m.BookListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'books/add',
    title: 'Lägg till bok | Bok & Citat',
    loadComponent: () => import('./components/book-form/book-form.component').then(m => m.BookFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'books/edit/:id',
    title: 'Redigera bok | Bok & Citat',
    loadComponent: () => import('./components/book-form/book-form.component').then(m => m.BookFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'quotes',
    title: 'Mina citat | Bok & Citat',
    loadComponent: () => import('./components/quote-list/quote-list.component').then(m => m.QuoteListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'quotes/add',
    title: 'Lägg till citat | Bok & Citat',
    loadComponent: () => import('./components/quote-form/quote-form.component').then(m => m.QuoteFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'quotes/edit/:id',
    title: 'Redigera citat | Bok & Citat',
    loadComponent: () => import('./components/quote-form/quote-form.component').then(m => m.QuoteFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    title: 'Min profil | Bok & Citat',
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'access-denied',
    title: 'Åtkomst nekad | Bok & Citat',
    loadComponent: () => import('./components/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
  },
  {
    path: 'login',
    title: 'Logga in | Bok & Citat',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    title: 'Sidan hittades inte | Bok & Citat',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
