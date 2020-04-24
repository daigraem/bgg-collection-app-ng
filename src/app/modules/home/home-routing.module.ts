import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameResolverService} from './game-resolver.service';
import { HomeComponent } from './components/home/home.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'games/:id',
    component: GameDetailsComponent,
    resolve: {
      game: GameResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
