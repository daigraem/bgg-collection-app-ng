import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@services/logger/logger.service';

export interface IAppConfig {
  appName: string;
  apiUrl: string;
}

@Injectable()
export class AppConfigService {
  static config: IAppConfig;

  constructor(private http: HttpClient, private logger: LoggerService) { }

  load() {
    const jsonFile = `./assets/config/config.json`;

    return new Promise<void>((resolve, reject) => {
      fetch(jsonFile)
        .then(response => response.json())
        .then((response: IAppConfig) => {
          AppConfigService.config = response as IAppConfig;

          this.logger.log(`Config Loaded`, AppConfigService.config);
          resolve();

        }).catch((response: any) => {
          reject(`Could not load the config file.`);
        });
    });
  }
}
