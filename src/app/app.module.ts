import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from '@services/app-config/app-config.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@shared/shared.module';
import { DataModule } from '@data/data.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CacheMapService } from '@data/services/cache/cache-map.service';
import { httpInterceptorProviders } from '@data/interceptors';

export function initializeApp(appConfigService: AppConfigService) {
  return (): Promise<any> => {
    return appConfigService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    DataModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    CacheMapService,
    {
      provide: Cache,
      useClass: CacheMapService
    },
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
