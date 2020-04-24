import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './components/home/home.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

@NgModule({
    declarations: [
      HomeComponent,
      GameListComponent,
      GameDetailsComponent,
    ],
    imports: [
      CommonModule,
      SharedModule,
      HomeRoutingModule
    ],
    exports: [],
    providers: []
})
export class HomeModule { }
