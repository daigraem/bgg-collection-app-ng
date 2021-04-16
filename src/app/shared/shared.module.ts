import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NpnSliderModule } from 'npn-slider';

import { RatingsComponent } from './components/ratings/ratings.component';
import { GameTitleComponent } from './components/game-title/game-title.component';
import { GameImageComponent } from './components/game-image/game-image.component';
import { InputDebounceComponent } from '../shared/components/input-debounce/input-debounce.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [
    RatingsComponent,
    GameTitleComponent,
    GameImageComponent,
    InputDebounceComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NpnSliderModule,
    RatingsComponent,
    GameTitleComponent,
    GameImageComponent,
    InputDebounceComponent,
  ],
})
export class SharedModule {}
