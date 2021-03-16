import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'games',
        loadChildren: () =>
          import('@modules/games/games.module').then(m => m.GamesModule),
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
