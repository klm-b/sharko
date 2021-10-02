import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { DocumentEventsService } from './core/services/utils/document-events.service';
import { ViewportScroller } from '@angular/common';
import { BookComponent } from './features/book/book.component';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { SummaryComponent } from './features/summary/summary.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'sharko';

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
    private documentEventsService: DocumentEventsService,
    private viewPortScroller: ViewportScroller
  ) {}

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.documentEventsService.documentClickedTarget.next(event.target);
  }

  loadingRouteConfig: boolean = false;

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });

    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponce?: LoginResponse) => {});
  }

  onActivate(event: any): void {
    if (event instanceof BookComponent || event instanceof SummaryComponent) {
      this.viewPortScroller.scrollToPosition([0, 0]);
    }
  }
}
