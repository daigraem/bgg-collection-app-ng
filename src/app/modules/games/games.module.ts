import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';

import { GamesRoutingModule } from './games-routing.module';

import { GamesComponent } from './components/games/games.component';
import { GameGamesComponent } from './components/games-list/games-list.component';
import { GameDetailsComponent } from './components/game-details/games-details.component';
import { FreetextFilterComponent } from './components/freetext-filter/freetext-filter.component';
import { OrderbyFilterComponent } from './components/orderby-filter/orderby-filter.component';

@NgModule({
    declarations: [
      GamesComponent,
      GameGamesComponent,
      GameDetailsComponent,
      FreetextFilterComponent,
      OrderbyFilterComponent,
    ],
    imports: [
      CoreModule,
      SharedModule,
      GamesRoutingModule
    ],
    exports: [],
    providers: []
})
export class GamesModule { }
