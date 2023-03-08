import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './common/components/base/base.component';
import { TopNavBarComponent } from './common/components/top-nav-bar/top-nav-bar.component';
import { MaterialModule } from './common/modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
