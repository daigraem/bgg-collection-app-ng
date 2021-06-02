import { Injectable } from '@angular/core';
import { LoggerService } from '@services/logger/logger.service';

export interface IAppConfig {
  appTitle: string;
  apiUrl: string;
  footerText: string;
}

@Injectable()
export class AppConfigService {
  static config: IAppConfig;

  constructor(private logger: LoggerService) {}

  load() {
    const jsonFile = `./assets/config/config.json`;

    return new Promise<void>((resolve, reject) => {
      fetch(jsonFile)
        .then((response) => response.json())
        .then((response: IAppConfig) => {
          AppConfigService.config = response as IAppConfig;

          this.logger.log(`Config Loaded`, AppConfigService.config);
          resolve();
        })
        .catch((response: any) => {
          reject(`Could not load the config file.`);
        });
    });
  }
}
