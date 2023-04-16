import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPageComponent } from "../pages/about/about-page/about-page.component";
import { AdoptFormHomeInfoComponent } from "../pages/adopt/adopt-form/adopt-form-home-info/adopt-form-home-info.component";
import { AdoptFormPetInfoComponent } from "../pages/adopt/adopt-form/adopt-form-pet-info/adopt-form-pet-info.component";
import { AdoptFormAdopterInfoComponent } from "../pages/adopt/adopt-form/adopt-form-adopter-info/adopt-form-adopter-info.component";
import { AdoptPageComponent } from "../pages/adopt/adopt-home/adopt-page/adopt-page.component";
import { AdoptRouterComponent } from "../pages/adopt/adopt-router/adopt-router.component";
import { DonatePageComponent } from "../pages/donate/donate-page/donate-page.component";
import { VolunteerPageComponent } from "../pages/volunteer/volunteer-page/volunteer-page.component";
import { ApplicationConfirmationComponent } from "../pages/adopt/adopt-form/application-confirmation/application-confirmation.component";
import { ApplicationErrorComponent } from "../pages/adopt/adopt-form/application-error/application-error.component";
import { LandingPageComponent } from "../pages/landing/landing-page/landing-page.component";
import { FosterFormComponent } from "../pages/volunteer/foster-form/foster-form.component";
import { VolunteerRouterComponent } from "../pages/volunteer/volunteer-router/volunteer-router.component";
import { ThanksPageComponent } from "../pages/thanks-page/thanks-page.component";
import { HostedImagesComponent } from "../common/components/hosted-images/hosted-images.component";


export const routes: Routes = [
 {
   path: "error",
   component: LandingPageComponent,
 },
 {
   path: "landing-page",
   component: LandingPageComponent,
 },
 {
   path: "about-page",
   component: AboutPageComponent,
 },
 {
   path: "volunteer-page",
   component: VolunteerRouterComponent,
   children:[
    { path: "home",
      component: VolunteerPageComponent
    },
    { path: "form-foster",
      component: FosterFormComponent
    },
    { path: "**",
    redirectTo: "home"
    }
  ]
 },
 {
   path: "adopt-page",
   component: AdoptRouterComponent,
   children:[
    { path: "home",
      component: AdoptPageComponent
    },
    { path: "form-adopter-info",
      component: AdoptFormAdopterInfoComponent
    },
    {
      path: "form-home-info",
      component: AdoptFormHomeInfoComponent
    },
    {
      path: "form-pet-info",
      component: AdoptFormPetInfoComponent
    },
    {
      path: "application-confirmation",
      component: ApplicationConfirmationComponent
    },
    {
      path: "application-error",
      component: ApplicationErrorComponent
    },
    { path: "**",
    redirectTo: "home"
    },
  ]
 },
 {
   path: "donate-page",
   component: DonatePageComponent,
 },
 {
   path: "thank-you",
   component: ThanksPageComponent,
 },
 {
  //a route just to have a place for extra hosted images
   path: "hosted-images",
   component: HostedImagesComponent,
 },
 { path: "**",
   redirectTo: "landing-page"
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }