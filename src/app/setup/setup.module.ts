import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
// import { ApplyForLeaveComponent } from '../Apply-For-Leave/Apply-For-Leave.component';
import { DepartmentComponent } from '../Department/Department.component';
import { EmployeeDashboardComponent } from '../EmployeeDashboard/EmployeeDashboard.component';
import { HolidayComponent } from '../Holiday/Holiday.component';
import { LeaveRequestComponent } from '../Leave-Request/Leave-Request.component';
import { HeaderComponent } from '../header/header.component';
import { HomeScreenPageComponent } from '../home-screen-page/home-screen-page.component';
import { LoaderComponent } from '../loader/loader.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../Shared/SharedModule.module';
import { EventComponent } from '../Event/Event.component';





const routes: Routes = [

  // {path: '', redirectTo: '/Login', pathMatch: 'full'},
  {path: 'homescreen', component: HomeScreenPageComponent, pathMatch: 'full'},
  {path: 'employeescreen', component: EmployeeDashboardComponent, pathMatch: 'full'},
  {path: 'department', component: DepartmentComponent, pathMatch: 'full'},
  {path: 'holiday', component: HolidayComponent, pathMatch: 'full'},
  {path: 'ViewLeave', component: LeaveRequestComponent, pathMatch: 'full'},
  // {path: 'ApplyLeave', component: ApplyForLeaveComponent, pathMatch: 'full'},
  //  {path:'shared', 
  //   loadChildren: () => import('../Shared/SharedModule.module').then(m => m.Shared)
  // }
];

@NgModule({
   
  imports: [
    RouterModule.forRoot(routes),
    CommonModule, 
    ReactiveFormsModule,
     HttpClientModule,
     FormsModule,
    
  ],
  declarations: [SetupComponent, 
    HomeScreenPageComponent,
    EmployeeDashboardComponent,
    SidebarComponent,
    DepartmentComponent,
    HolidayComponent,
    LeaveRequestComponent,
    // ApplyForLeaveComponent,
    HeaderComponent,
    // EventComponent,
  //  SidebarComponent,
    
  ]
  
})
export class SetupModule { 
}
