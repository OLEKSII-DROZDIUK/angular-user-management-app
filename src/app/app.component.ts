import { Component } from '@angular/core';
import { GlobalLoaderService } from '@services/global-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public loaderSrv: GlobalLoaderService) {}
}
