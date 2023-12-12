import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { CanActivate} from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { PostJobComponent } from './post-job/post-job.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { PublicLabourProfileComponent } from './public-labour-profile/public-labour-profile.component';



const routes: Routes = [
  {path: 'loginPage', component: LoginComponent },
  {path: 'Signup', component:  SignupComponent },
  {path: 'Home', component:  MainPageComponent },
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Jobs', component:  JobsComponent },
  {path: 'Services', component:  ServicesComponent },
  {path: 'contactUs', component:  ContactUsComponent },
  {path: 'aboutUs', component:  AboutUSComponent },
  {path: 'Profile', component:  UserProfileComponent ,canActivate:[AuthGuard] },
  {path: 'Dashboard', component:  DashboardComponent ,canActivate:[AuthGuard] },
  {path: 'Postjob', component:  PostJobComponent ,canActivate:[AuthGuard] },
  {path: 'Viewjob', component:  ViewJobComponent ,canActivate:[AuthGuard] },
  {path: 'labourProfile', component:  PublicLabourProfileComponent ,canActivate:[AuthGuard] },
];


RouterModule.forRoot([
  {path: 'loginPage', component:LoginComponent}
],{ onSameUrlNavigation: 'reload' })

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
