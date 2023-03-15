import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BaseComponent } from './common/components/base/base.component';
import { TopNavBarComponent } from './common/components/top-nav-bar/top-nav-bar.component';
import { MaterialModule } from './modules/material.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { VolunteerPageComponent } from './pages/volunteer-page/volunteer-page.component';
import { AdoptPageComponent } from './pages/adopt/adopt-home/adopt-page/adopt-page.component';
import { DonatePageComponent } from './pages/donate-page/donate-page.component';
import { AppRoutingModule } from './modules/routes.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatLoaderComponent } from './common/components/cat-loader/cat-loader.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericActionModalComponent } from './common/components/generic-action-modal/generic-action-modal.component';
import { AdoptAnimalListComponent } from './pages/adopt/adopt-home/adopt-animal-list/adopt-animal-list.component';
import { PetModalComponent } from './pages/adopt/adopt-home/pet-modal/pet-modal.component';
import { CarouselComponent, SafePipe } from './pages/adopt/adopt-home/carousel/carousel.component';
import { FullImageModalComponent } from './common/components/full-image-modal/full-image-modal.component';
import { AdoptFormUserInfoComponent } from './pages/adopt/adopt-form/adopt-form-user-info/adopt-form-user-info.component';
import { AdoptFormHomeInfoComponent } from './pages/adopt/adopt-form/adopt-form-home-info/adopt-form-home-info.component';
import { AdoptFormPetInfoComponent } from './pages/adopt/adopt-form/adopt-form-pet-info/adopt-form-pet-info.component';


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
    CatLoaderComponent,
    GenericActionModalComponent,
    AdoptAnimalListComponent,
    PetModalComponent,
    CarouselComponent,
    SafePipe,
    FullImageModalComponent,
    AdoptFormUserInfoComponent,
    AdoptFormHomeInfoComponent,
    AdoptFormPetInfoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
