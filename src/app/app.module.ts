import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { JobsComponent } from './jobs/jobs.component';
import { LatestJobsComponent } from './latest-jobs/latest-jobs.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { HotToastModule } from '@ngneat/hot-toast';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { PostJobComponent } from './post-job/post-job.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PublicLabourProfileComponent } from './public-labour-profile/public-labour-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    JobsComponent,
    LatestJobsComponent,
    LoginComponent,
    MainPageComponent,
    ServicesComponent,
    SignupComponent,
    UserProfileComponent,
    PostJobComponent,
    DashboardComponent,
    ViewJobComponent,
    AboutUSComponent,
    ContactUsComponent,
    PublicLabourProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatSelectModule,
    HotToastModule
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
