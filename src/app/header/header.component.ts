import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { EmployeeDashboardComponent } from '../EmployeeDashboard/EmployeeDashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit{
  loginForm: any;
  FirstName: any = '';
  userinformation:any 
  ShowHeader: boolean = true;
url: string = ""
  constructor(public apiservices: ApiserviceService, fb: FormBuilder, private router: Router) {
    router.events.subscribe( (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange() )
    
}
  handleRouteChange(): void {
    this.url = this.router.url.split('/')[2];
    if (this.router.url.includes('homescreen')) {
this.ShowHeader = true
     }
    else{
      if(this.router.url.includes('ApplyLeave'))
        
{
  this.url = "";
}  else if(this.router.url.includes('ViewLeave')){
  this.url = "";
}
    this.ShowHeader = false

    }  }
  ngAfterViewInit(): void {
    this.FirstName =  localStorage.getItem("FullName")
    console.log(this.FirstName, "FullName")
//  this.url = localStorage.getItem("HeaderName")!
  // localStorage.setItem("HeaderName", this.url)
  
  // if(this.url == "homescreen"){
  //   this.ShowHeader = true;
  // }else{
  //   this.ShowHeader = false;
  // }

   
    
//   this.userinformation =this.apiservices.getData()
// if(this.userinformation != null ){
// this.fullName = this.userinformation.fullName
// }
  }
  ngOnInit(): void {

  }



getUserData() {
  this.apiservices
  .loginUser(this.loginForm.get('Email')?.value, this.loginForm.value.PasswordHash)
  .subscribe((data: any) =>{
    // Assuming the response contains 'fullName' field
    console.log(data)
    this.FirstName = data.FirstName;
  });
}
}
