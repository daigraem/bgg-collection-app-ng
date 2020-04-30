import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RatingsComponent } from '../shared/ratings/ratings.component';
import { GameTitleComponent } from './game-title/game-title.component';
import { GameImageComponent } from './game-image/game-image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    RatingsComponent,
    GameTitleComponent,
    GameImageComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RatingsComponent,
    GameTitleComponent,
    GameImageComponent,
  ]
})
export class SharedModule {}
