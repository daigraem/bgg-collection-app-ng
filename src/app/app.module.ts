import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';
import { DataModule } from '@data/data.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CacheMapService } from '@data/services/cache/cache-map.service';
import { httpInterceptorProviders } from '@data/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    DataModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    CacheMapService,
    { provide: Cache, useClass: CacheMapService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
