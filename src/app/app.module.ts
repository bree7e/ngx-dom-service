import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';
import { CounterModule } from './counter/counter.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PortalModule, CounterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
