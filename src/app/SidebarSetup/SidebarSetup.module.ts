import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarSetupComponent } from './SidebarSetup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ApplyForLeaveComponent } from '../Apply-For-Leave/Apply-For-Leave.component';
import { DepartmentComponent } from '../Department/Department.component';
import { EmployeeDashboardComponent } from '../EmployeeDashboard/EmployeeDashboard.component';
import { HolidayComponent } from '../Holiday/Holiday.component';
import { LeaveRequestComponent } from '../Leave-Request/Leave-Request.component';
import { HomeScreenPageComponent } from '../home-screen-page/home-screen-page.component';
import { SharedModule } from '../Shared/SharedModule.module';




const routes: Routes = [

  // {path: '', redirectTo: '/Login', pathMatch: 'full'},
  {path: 'homescreen', component: HomeScreenPageComponent, pathMatch: 'full'},
  {path: 'employeescreen', component: EmployeeDashboardComponent, pathMatch: 'full'},
  {path: 'department', component: DepartmentComponent, pathMatch: 'full'},
  {path: 'holiday', component: HolidayComponent, pathMatch: 'full'},
  {path: 'ViewLeave', component: LeaveRequestComponent, pathMatch: 'full'},
  {path: 'ApplyLeave', component: ApplyForLeaveComponent, pathMatch: 'full'},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule, 
    ReactiveFormsModule,
     HttpClientModule,
     FormsModule,
     SharedModule
  ],
  declarations: [SidebarSetupComponent ]
})
export class SidebarSetupModule { 

}
