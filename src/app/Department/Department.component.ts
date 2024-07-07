import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-Department',
  templateUrl: './Department.component.html',
  styleUrls: ['./Department.component.css']
})
// oninit is called lifecycle hook it is an interface  
export class DepartmentComponent implements OnInit, AfterViewInit, OnDestroy{
openmodal: boolean =false;
Departmentform: any;
department: any ;
url:string =""
  constructor(public apiservices: ApiserviceService, fb: FormBuilder, private router: Router) {
    this.Departmentform = fb.group({
      DepartmentID: "",
      DepartmentName: "",
      DepartmentHead:"",
    });
  }
  ngOnDestroy(): void {
    localStorage.setItem("HeaderName", "homescreen")  
  }
  ngAfterViewInit(): void {

    this.url = window.location.href
    this.url = this.url.split("/")[4] 
    localStorage.setItem("HeaderName", this.url)
    
  }

  ngOnInit() {
    this.getAllDepartments();
    this.url = window.location.href
    this.url = this.url.split("/")[4] 
    localStorage.setItem("HeaderName", this.url)  
}
  
  // toggleModal(){
  //   this.openmodal = true;
  // }
closeModal(){
  this.openmodal = false;
}
AddDesignation(Values: FormGroup){
  this.apiservices.AddDepartment(Values.value).subscribe(
    
    response => {
      console.log(Values.value, "values")
      console.log('Response:', response);
      alert("Created successfully");
    },
    error => {
      console.error('Error:', error);
      alert("Error");
    }
  )
}

toggleModal = (modalId: string, action: string) => {
  const modalElement = document.getElementById(modalId);

  if (modalElement) {
    if (action === 'open') {
      modalElement.style.display = 'flex';
    } else {
      modalElement.style.display = 'none';
    }
  } 
};
getAllDepartments(){
  this.apiservices.GetAllDepartment().subscribe((data: any) => {
    this.department =data
    console.log(this.department , 'department' )
   // this.department.push(data)

  });
}
navigateToHome(){
  this.router.navigate(['setup/homescreen']);
}
}
