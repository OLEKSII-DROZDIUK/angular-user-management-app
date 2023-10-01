import { Component, OnInit } from '@angular/core';
import { GlobalLoaderService } from '@services/global-loader.service';

@Component({
  selector: 'app-global-loader',
  template: `<div class="loader">
    <div class="ball ball1"></div>
    <div class="ball ball2"></div>
    <div class="ball ball3"></div>
  </div> `,
  styleUrls: ['./global-loader.component.scss'],
})
export class GlobalLoaderComponent implements OnInit {
  public loading: boolean = false;

  constructor(private loaderSrv: GlobalLoaderService) {}

  public ngOnInit() {
    this.loaderSrv.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }
}
