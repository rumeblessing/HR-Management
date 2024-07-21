import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeScreenPageComponent } from './home-screen-page/home-screen-page.component';
import { EmployeeDashboardComponent } from './EmployeeDashboard/EmployeeDashboard.component';
import { DepartmentComponent } from './Department/Department.component';
import { HolidayComponent } from './Holiday/Holiday.component';
import { LeaveRequestComponent } from './Leave-Request/Leave-Request.component';
import { ApplyForLeaveComponent } from './Apply-For-Leave/Apply-For-Leave.component';
import { SetupComponent } from './setup/setup.component';
import { FormComponent } from './form/form.component';
import { JobsComponent } from './Jobs/Jobs.component';
import { ReferralComponent } from './Referral/Referral.component';
import { ApplicantComponent } from './Applicant/Applicant.component';
import { SidebarSetupComponent } from './SidebarSetup/SidebarSetup.component';
import { SharedComponent } from './Shared/Shared.component';
import { EventComponent } from './Event/Event.component';

const routes: Routes = [
  {path: 'Login', component: LoginPageComponent, pathMatch: 'full'},
  {path: '', redirectTo: '/Login', pathMatch: 'full'},
  { path: 'setup',component: SetupComponent,
    children: [
    {path: 'homescreen', component: HomeScreenPageComponent, pathMatch: 'full'},
    {path: 'employeescreen', component: EmployeeDashboardComponent, pathMatch: 'full'},
    {path: 'department', component: DepartmentComponent, pathMatch: 'full'},
    {path: 'holiday', component: HolidayComponent, pathMatch: 'full'},
    {path: 'form', component: FormComponent, pathMatch: 'full'},
    {path: 'Jobs', component: JobsComponent, pathMatch: 'full'},
    {path: 'referral', component: ReferralComponent, pathMatch: 'full'},
    {path: 'applicant', component: ApplicantComponent, pathMatch: 'full'},
    {path: 'ViewLeave', component: LeaveRequestComponent, pathMatch: 'full'},
    // {path: 'ApplyLeave', component: ApplyForLeaveComponent, pathMatch: 'full'},
    {path: 'event', component: EventComponent, pathMatch: 'full'},

  ]
  } ,
  // { path: 'sidebarsetup',component: SidebarSetupComponent,
  //   children: [
      
  //   ]
  // } ,
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
