import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@services/app-config/app-config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  text: string;

  constructor() { }

  ngOnInit(): void {
    this.text = AppConfigService.config.footerText;
  }

}
