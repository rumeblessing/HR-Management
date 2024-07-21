import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ApiserviceService } from './services/apiservice.service';
import { HomeScreenPageComponent } from './home-screen-page/home-screen-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeeDashboardComponent } from './EmployeeDashboard/EmployeeDashboard.component';
import { LoaderComponent } from './loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { DepartmentComponent } from './Department/Department.component';
import { HolidayComponent } from './Holiday/Holiday.component';
import { LeaveRequestComponent } from './Leave-Request/Leave-Request.component';
// import { ApplyForLeaveComponent } from './Apply-For-Leave/Apply-For-Leave.component';
import { SetupModule } from './setup/setup.module';
import { SetupComponent } from './setup/setup.component';
import { FormComponent } from './form/form.component';
import { JobsComponent } from './Jobs/Jobs.component';
import { ReferralComponent } from './Referral/Referral.component';
import { ApplicantComponent } from './Applicant/Applicant.component';
import { EventComponent } from './Event/Event.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  declarations: [												
    AppComponent,
    LoginPageComponent,
    LoaderComponent,
      FormComponent,
      JobsComponent,
      ReferralComponent,
      ApplicantComponent,
      EventComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    SweetAlert2Module.forRoot() 
    
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

