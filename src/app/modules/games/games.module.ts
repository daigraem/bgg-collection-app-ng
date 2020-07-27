import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '@shared/shared.module';

import { GamesRoutingModule } from './games-routing.module';

import { GamesComponent } from './components/games/games.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GameDetailsComponent } from './components/game-details/games-details.component';
import { FiltersComponent } from './components/filters/filters.component';
import { OrderbyFilterComponent } from './components/orderby-filter/orderby-filter.component';

@NgModule({
  declarations: [
    GamesComponent,
    GamesListComponent,
    GameDetailsComponent,
    FiltersComponent,
    OrderbyFilterComponent,
  ],
  imports: [
    SharedModule,
    ScrollingModule,
    GamesRoutingModule
  ],
  exports: [],
  providers: []
})
export class GamesModule { }
