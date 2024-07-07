import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-SidebarSetup',
  templateUrl: './SidebarSetup.component.html',
  styleUrls: ['./SidebarSetup.component.css']
})
export class SidebarSetupComponent implements OnInit {

  isCollapse: boolean = false;
  isExpanded: boolean = false;
  isCollapsed: boolean = false;

  constructor(public apiservices: ApiserviceService, fb: FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    
  }
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
  toggleAuthDropdown() {
    this.isCollapse = !this.isCollapse;
  }
  toggleHireDropdown(){
    this.isCollapsed = !this.isCollapsed;
  }
  navigateToEmployeeDashboard() {
    this.router.navigate(['setup/employeescreen']);
  }
  NavigateToDashboard() {
    this.router.navigate(['setup/homescreen']);
  }
 
  navigateToDepartment() {
    this.router.navigate(['setup/department']);
  }
  navigateToHoliday(){
    this.router.navigate(['setup/holiday']);
  }
  navigateToViewLeave(){
    this.router.navigate(['setup/ViewLeave']);
  }
  navigateToApplyLeave(){
    this.router.navigate(['setup/ApplyLeave']);
  }
  navigateToLogin(){
    this.router.navigate(['Login']);
  }
  navigateTojobs(){
    this.router.navigate(['setup/Jobs']);
  }
  navigateToreferral(){
    this.router.navigate(['setup/referral']);

  }
  navigateToapplicant(){
    this.router.navigate(['setup/applicant']);

  }


}
