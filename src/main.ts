import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { RestManagerModule } from "lib/core/rest-manager.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(RestManagerModule);
