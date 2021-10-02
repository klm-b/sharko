import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SilentRenewGuard } from './core/guards/silent-renew.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    // canActivate: [SilentRenewGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'u',
    redirectTo: 'user',
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'library',
    loadChildren: () =>
      import('./features/library/library.module').then((m) => m.LibraryModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'book',
    loadChildren: () =>
      import('./features/book/book.module').then((m) => m.BookModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'summary',
    loadChildren: () =>
      import('./features/summary/summary.module').then((m) => m.SummaryModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'author',
    loadChildren: () =>
      import('./features/author/author.module').then((m) => m.AuthorModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search/search.module').then((m) => m.SearchModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'popular',
    loadChildren: () =>
      import('./features/popular/popular.module').then((m) => m.PopularModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: 'moderator',
    loadChildren: () =>
      import('./features/moderator/moderator.module').then(
        (m) => m.ModeratorModule
      ),
    canLoad: [AutoLoginPartialRoutesGuard],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
