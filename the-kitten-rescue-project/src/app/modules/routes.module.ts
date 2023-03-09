import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "../pages/landing-page/landing-page.component";


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
   component: LandingPageComponent,
 },
 {
   path: "volunteer-page",
   component: LandingPageComponent,
 },
 {
   path: "adopt-page",
   component: LandingPageComponent,
 },
 {
   path: "donate-page",
   component: LandingPageComponent,
 },
 { path: "**",
   redirectTo: "error"
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }