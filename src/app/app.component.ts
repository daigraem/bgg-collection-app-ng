import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfigService } from '@services/app-config/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(AppConfigService.config.appTitle);
  }
}
