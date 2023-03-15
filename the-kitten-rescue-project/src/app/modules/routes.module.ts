import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPageComponent } from "../pages/about-page/about-page.component";
import { AdoptFormHomeInfoComponent } from "../pages/adopt/adopt-form/adopt-form-home-info/adopt-form-home-info.component";
import { AdoptFormPetInfoComponent } from "../pages/adopt/adopt-form/adopt-form-pet-info/adopt-form-pet-info.component";
import { AdoptFormUserInfoComponent } from "../pages/adopt/adopt-form/adopt-form-user-info/adopt-form-user-info.component";
import { AdoptPageComponent } from "../pages/adopt/adopt-home/adopt-page/adopt-page.component";
import { DonatePageComponent } from "../pages/donate-page/donate-page.component";
import { LandingPageComponent } from "../pages/landing-page/landing-page.component";
import { VolunteerPageComponent } from "../pages/volunteer-page/volunteer-page.component";


const routes: Routes = [
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
   component: VolunteerPageComponent,
 },
 {
   path: "adopt-page",
   component: AdoptPageComponent,
   children:[
    { path: "form-user-info",
      component: AdoptFormUserInfoComponent
    },
    {
      path: "form-home-info",
      component: AdoptFormHomeInfoComponent
    },
    {
      path: "form-pet-info",
      component: AdoptFormPetInfoComponent
    },
  ]
 },
 {
   path: "donate-page",
   component: DonatePageComponent,
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