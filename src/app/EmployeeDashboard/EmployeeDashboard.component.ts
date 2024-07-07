import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-EmployeeDashboard',
  templateUrl: './EmployeeDashboard.component.html',
  styleUrls: ['./EmployeeDashboard.component.css']
  
})
export class EmployeeDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapse: boolean = false;
  isExpanded: boolean = false;
  employee: any;
  openmodal: boolean = false;
  Employeeform: FormGroup;
  url: string = "";
  users: any[] = [];
  employeeCount: number = 0;
  maleCount: number = 0;
  femaleCount: number = 0;
  filteredEmployees: any[] = [];
  
  @ViewChild('employeeTable') employeeTable: ElementRef | undefined;

  constructor(
    public apiservices: ApiserviceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.Employeeform = this.fb.group({
      employeeID: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      nationality: [''],
      gender: [''],
      state: [''],
      city: [''],
      employmentType: [''],
      department: [''],
      employeeStatus: [''],
      streetAddress: [''],
      employeeRole: [''],
      dateOfBirth: ['', Validators.required],
      joiningDate: [new Date()],
      nextOfKinName: [''],
      relationshipWithEmployee: [''],
      nextOfKinPhonenumber: [''],
      employeeSchoolName: [''],
      employeeDegree: [''],
      employeeProgram: [''],
      employeeGraduationYear: ['']
    });
  }

  ngOnDestroy(): void {
    localStorage.setItem("HeaderName", "homescreen");
  }

  ngAfterViewInit(): void {
    this.url = window.location.href.split("/")[4];
    localStorage.setItem("HeaderName", this.url);
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleAuthDropdown() {
    this.isCollapse = !this.isCollapse;
  }

  navigateToEmployeeDashboard() {
    this.router.navigate(['/employeescreen']);
  }

  toggleModal = (modalId: string, action: string) => {
    const modalElement = document.getElementById(modalId);

    if (modalElement) {
      modalElement.style.display = action === 'open' ? 'flex' : 'none';
    }
  };

  scrollToTable() {
    try {
      if (this.employeeTable && this.employeeTable.nativeElement) {
        this.employeeTable.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch(err) {
      console.error('Error scrolling to table:', err);
    }
  }
  
  navigateToAllEmployees() {
    this.filteredEmployees = this.employee; 
    this.scrollToTable(); 
  }

  filterByGender(gender: string) {
    this.filteredEmployees = this.employee.filter((emp: { gender: string; }) => emp.gender.toLowerCase() === gender.toLowerCase());
    this.updateCounts();
    this.scrollToTable();
  }

  updateCounts() {
    this.employeeCount = this.employee.length;
    this.maleCount = this.employee.filter((user: { gender: string }) => user.gender.toLowerCase() === 'male').length;
    this.femaleCount = this.employee.filter((user: { gender: string }) => user.gender.toLowerCase() === 'female').length;
  }

  AddEmployee(values: FormGroup) {
    this.apiservices.AddDepartment(values.value).subscribe(
      response => {
        console.log('Response:', response);
        alert("Created successfully");
      },
      error => {
        console.error('Error:', error);
        alert("Record created");
      }
    )
  }

  navigateToEmployeeform() {
    this.router.navigate(['setup/form']);
  }

  ngOnInit() {
    this.getAllEmployee();
    this.users = this.apiservices.getUsers();
  }

  getAllEmployee() {
    this.apiservices.GetAllUsers().subscribe((data: any) => {
      this.employee = data;
      this.filteredEmployees = [...this.employee];
      this.updateCounts();
      this.scrollToTable();
    });
  }

  RegisterEmployee() {
    this.Employeeform.value.joiningDate = new Date();
    this.apiservices.createUser(this.Employeeform.value).subscribe(
      response => {
        console.log('Response:', response);
        alert(response);
        this.Employeeform.reset();
        this.toggleModal('CreateEmployeeModal', 'close');
        this.getAllEmployee();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  navigateToHome(){
    this.router.navigate(['setup/homescreen']);
  }
}
