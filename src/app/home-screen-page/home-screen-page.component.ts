import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-home-screen-page',
  templateUrl: './home-screen-page.component.html',
  styleUrls: ['./home-screen-page-component.css'],
})
export class HomeScreenPageComponent implements OnInit, AfterViewInit {
  @ViewChild('myDoughnutChart') private doughnutChartRef!: ElementRef;
  isCollapse: boolean = false;
  isExpanded: boolean = false;
  loginForm: any;
  firstName: any = '';
  employeeCount: number = 0;
  eventCount: number = 0;
  holidays: any[] = [];
  doughnutChart: any;
  maleCount: number =0;
  femaleCount: number =0;
  departments: any[] = [];

  constructor(public apiservices: ApiserviceService, fb: FormBuilder, private router: Router,) {
    Chart.register(...registerables);
    this.loginForm = fb.group({
      Email: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }
  ngAfterViewInit(): void {
    this.createDoughnutChart();
  }

  ngOnInit(): void {
    // this.getUserData();
    this.getAllUsers();
    this.getEvents();
    this.getAllDepartments()  
  }
 

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
  toggleAuthDropdown() {
    this.isCollapse = !this.isCollapse;
  }
  navigateToDepartment() {
    this.router.navigate(['setup/department']);
  }

  getUserData() {
    this.apiservices
    .loginUser(this.loginForm.get('Email')?.value, this.loginForm.value.PasswordHash)
    .subscribe((data: any) =>{
      // Assuming the response contains 'fullName' field
      console.log(data )
      this.firstName = data.firstName;
    });
   
  }
 
    getAllUsers() {

      this.apiservices.GetAllUsers().subscribe((data: any) => {
        this.maleCount = data.filter((user: { gender: string }) => user.gender.toLowerCase() === 'male').length;
        this.femaleCount = data.filter((user: { gender: string }) => user.gender.toLowerCase() === 'female').length;
        this.employeeCount = data.length;
  
        // Update the chart with the fetched data
        this.updateDoughnutChart();
      });
  }
  getEvents(){
    this.apiservices.getEvents().subscribe(data => {
      console.log(data, "Holiday")
      this.holidays = data.response.holidays;
      this.eventCount = this.holidays.length;
      console.log( this.eventCount , 'eventcount')
    });

  }
  gotoEmployeePage(){
    this.router.navigate(['setup/employeescreen']);
  }
  navigateToHoliday(){
    this.router.navigate(['setup/holiday']);
  }

  navigateToEvent(){
    this.router.navigate(['setup/event']);
  }

  createDoughnutChart(): void {
    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Male', 'Female'],
          datasets: [
            {
              data: [this.maleCount, this.femaleCount],
              backgroundColor: ['#6d44b8', '#f58634'],
                         hoverBackgroundColor: ['#6d44b8', '#f58634'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true, 
              position: 'bottom', 
              labels: {
                boxWidth: 20,  
                boxHeight: 20, 
                font: {
                  size: 14, 
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem: any) {
                  let label = tooltipItem.label || '';
                  if (label) {
                    label += ': ';
                  }
                  const value = tooltipItem.raw as number;
                  label += value.toString();
                  return label;
                },
              },
            },
          },
        },
      });
    } else {
      console.error('Failed to acquire context for the doughnut chart');
    }
  }
  
    getAllDepartments() {
    this.apiservices.GetAllDepartment().subscribe((data: any) => {
      this.departments = data; // Assign fetched departments to local array
      console.log(this.departments, 'departments');
    });
  }

  updateDoughnutChart(): void {
    if (this.doughnutChart) {
      this.doughnutChart.data.datasets[0].data = [this.maleCount, this.femaleCount];
      this.doughnutChart.update();
    }
  }
}
