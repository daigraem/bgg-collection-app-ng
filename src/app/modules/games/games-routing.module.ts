import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameResolverService} from './services/game-resolver/game-resolver.service';
import { GamesComponent } from './components/games/games.component';
import { GameDetailsComponent } from './components/game-details/games-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GamesComponent
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
export class GamesRoutingModule {}
