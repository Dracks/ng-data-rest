/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RestManagerService } from 'lib/core/rest-manager.service';

@Component({
  selector: 'app',
  template: ``
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  providers: [ RestService ],
  imports: [ BrowserModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
