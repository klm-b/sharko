import { Component, Inject, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/config/app-config.interface';
import { APP_CONFIG } from 'src/app/config/app-config.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerUri!: string;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  ngOnInit() {
    this.registerUri = this.config.baseUrl + this.config.identityRegisterPath;
  }
}
