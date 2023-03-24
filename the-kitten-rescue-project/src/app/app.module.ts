import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { BaseComponent } from './common/components/base/base.component';
import { TopNavBarComponent } from './common/components/top-nav-bar/top-nav-bar.component';
import { MaterialModule } from './modules/material.module';

import { AboutPageComponent } from './pages/about/about-page/about-page.component';
import { VolunteerPageComponent } from './pages/volunteer-page/volunteer-page.component';
import { AdoptPageComponent } from './pages/adopt/adopt-home/adopt-page/adopt-page.component';
import { DonatePageComponent } from './pages/donate/donate-page/donate-page.component';
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
import { AdoptFormAdopterInfoComponent } from './pages/adopt/adopt-form/adopt-form-adopter-info/adopt-form-adopter-info.component';
import { AdoptFormHomeInfoComponent } from './pages/adopt/adopt-form/adopt-form-home-info/adopt-form-home-info.component';
import { AdoptFormPetInfoComponent } from './pages/adopt/adopt-form/adopt-form-pet-info/adopt-form-pet-info.component';
import { AdoptRouterComponent } from './pages/adopt/adopt-router/adopt-router.component';
import { AdoptStepperComponent } from './pages/adopt/adopt-form/adopt-stepper/adopt-stepper.component';
import { RouterModule } from '@angular/router';
import {routes} from './modules/routes.module';
import { ApplicationConfirmationComponent } from './pages/adopt/adopt-form/application-confirmation/application-confirmation.component';
import { ApplicationErrorComponent } from './pages/adopt/adopt-form/application-error/application-error.component';
import { TeaLoaderComponent } from './common/components/tea-loader/tea-loader.component';
import { LandingCardsComponent } from './pages/landing/landing-cards/landing-cards.component';
import { LandingPageComponent } from './pages/landing/landing-page/landing-page.component';
import { ContactPageComponent } from './pages/contact/contact-page/contact-page.component';
import { AboutTabsComponent } from './pages/about/about-tabs/about-tabs.component';
import { DonateTabsComponent } from './pages/donate/donate-tabs/donate-tabs.component';
import { PaypalModalComponent } from './common/components/paypal-modal/paypal-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './common/components/footer/footer.component';

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
    AdoptFormAdopterInfoComponent,
    AdoptFormHomeInfoComponent,
    AdoptFormPetInfoComponent,
    AdoptRouterComponent,
    AdoptStepperComponent,
    ApplicationConfirmationComponent,
    ApplicationErrorComponent,
    TeaLoaderComponent,
    LandingCardsComponent,
    ContactPageComponent,
    AboutTabsComponent,
    DonateTabsComponent,
    PaypalModalComponent,
    FooterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'} ),
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
