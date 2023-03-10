import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BaseComponent } from './common/components/base/base.component';
import { TopNavBarComponent } from './common/components/top-nav-bar/top-nav-bar.component';
import { MaterialModule } from './modules/material.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { VolunteerPageComponent } from './pages/volunteer-page/volunteer-page.component';
import { AdoptPageComponent } from './pages/adopt-page/adopt-page.component';
import { DonatePageComponent } from './pages/donate-page/donate-page.component';
import { AppRoutingModule } from './modules/routes.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    BaseComponent,
    LandingPageComponent,
    AboutPageComponent,
    VolunteerPageComponent,
    AdoptPageComponent,
    DonatePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
