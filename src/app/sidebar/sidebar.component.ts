import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapse: boolean = false;
  isExpanded: boolean = false;
  isCollapsed: boolean = false;

  constructor(public apiservices: ApiserviceService, fb: FormBuilder, private router: Router) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    const mainElement = document.querySelector('.main');
    if (mainElement) {
      mainElement.classList.toggle('expand', this.isExpanded);
    }
  }

  toggleAuthDropdown() {
    this.isCollapse = !this.isCollapse;
  }

  toggleHireDropdown() {
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

  navigateToHoliday() {
    this.router.navigate(['setup/holiday']);
  }

  navigateToViewLeave() {
    this.router.navigate(['setup/ViewLeave']);
  }

  navigateToApplyLeave() {
    this.router.navigate(['setup/ApplyLeave']);
  }

  navigateToLogin() {
    this.router.navigate(['Login']);
  }

  navigateTojobs() {
    this.router.navigate(['setup/Jobs']);
  }

  navigateToreferral() {
    this.router.navigate(['setup/referral']);
  }

  navigateToapplicant() {
    this.router.navigate(['setup/applicant']);
  }
}
