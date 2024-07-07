import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  hideSignup: boolean = false;
  form!: FormGroup;
  loginForm!: FormGroup;
  showPassword: boolean = true;
  isLoading: boolean = false;
  hasemailerror: boolean = false;
  haspsworderror: boolean = false;
  hasNameError: boolean = false;
  passwordMatchError: boolean = false;

  constructor(public apiservices: ApiserviceService, fb: FormBuilder, private router: Router) {
 

    // Initializing the signup form
    this.form = fb.group({
      EmployeeID: 0,
      FullName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
ConfirmPasswordHash: ['', [Validators.required]],
      EmployeeStatus: "Active",
      Designation: "",
      EmployeeRole: "",
      DateOfBirth: "",
    })

    // Initializing the login form
    this.loginForm = fb.group({
      Email: ['', [Validators.required, Validators.email]],
      PasswordHash: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });

    // confirmpassword validation
    
  }
  ngOnInit(): void {
    this.hasemailerror = false;
    this.haspsworderror = false;
    this.loginForm.reset();
  }

  // Email validation
  ValidateEmail(Email: string) {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var result = regexp.test(Email);

    if (this.loginForm.value.Email.trim() == "" || this.loginForm.value.email.trim().length == 0) {
      this.hasemailerror = false;
    } else {
      if (!result) {
        this.hasemailerror = true;
      } else {
        this.hasemailerror = false;
      }
    }
  }

  // Password validation
  ValidatePassword(PasswordHash: string) {
    var regexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
    var result = regexp.test(PasswordHash);

    if (this.loginForm.value.PasswordHash.trim() == "" || this.loginForm.value.PasswordHash.trim().length == 0) {
      this.haspsworderror = false;
    } else {
      if (!result) {
        this.haspsworderror = true;
      } else {
        this.haspsworderror = false;
      }
    }
  }
  // Function to check if password and confirm password fields match
  validatePasswordMatch() {
    const password = this.form.get('PasswordHash')?.value;
    const confirmPassword = this.form.get('ConfirmPasswordHash')?.value;
    this.passwordMatchError = password !== confirmPassword;
  }

  // Name validation
  ValidateName(FullName: string) {
    var regexp = new RegExp('^[a-zA-Z]+$'); 
    var result = regexp.test(FullName);
    
    if (this.form.value.FullName.trim() == "" || this.form.value.FullName.trim().length == 0) {
        this.hasNameError = true; 
    } else {
        if (!result) {
            this.hasNameError = true; 
        } else {
            this.hasNameError = false; 
        }
    }
  }
  

  hideSignUp() {
    this.hideSignup = true;
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  disableButton:boolean =false
  // Function to submit form
  RegisterUsers(Values: FormGroup) {
    console.log(Values.value)
    this.form.patchValue({
      EmployeeID: this.form.value.EmployeeID,
      FullName: Values.value.FullName,
      Email: Values.value.Email,
      PasswordHash: Values.value.PasswordHash,
      ConfirmPasswordHash: Values.value.ConfirmPasswordHash,
      EmployeeStatus: this.form.value.EmployeeStatus,
      Designation: this.form.value.Designation,
      EmployeeRole: this.form.value.EmployeeRole,
      DateOfBirth: this.form.value.DateOfBirth,
    })
    console.log(this.form.value)
if(this.form.value.Email ==null){
  alert("Email Cannot be Null")
  this.disableButton =true
  return
}
if(this.form.value.Designation ==null){
  alert("Designation Cannot be Null")
  this.disableButton =true
  return
}
if(this.form.value.FullName ==null){
  alert("FullName Cannot be Null")
  this.disableButton =true
  return
}
    // Call services
    this.apiservices.createUser(this.form.value).subscribe(
      response => {
        console.log('Response:', response);
        alert("Created successfully");
      },
      error => {
        console.error('Error:', error);
        alert("Record cannot be created");
      }
    );
  }

  // Function to login
  loginUser(Values: FormGroup) {
    this.isLoading = true;
    console.log(Values.value);

    this.apiservices.loginUser(this.loginForm.get('Email')?.value, this.loginForm.value.PasswordHash)
    .subscribe((response: any) => {
      console.log(response, "Firstcheck");

      if (response != null) {
        if (response.designation == "HR") {
         this.apiservices.setData(response)
        //  store in local storage
         localStorage.setItem("FullName",response.fullName)
          this.router.navigate(['setup/homescreen']);
        } else {
          
         localStorage.setItem("FullName",response.fullName)
         console.log(response.fullName, "employeefullname")
          this.apiservices.setData(response)
          this.router.navigate(['setup/homescreen']);
        }
      } else {
        alert("User was not found");
      }
      this.isLoading = false; // Stop loading in both success and error cases
    },
      (error) => {
        console.error('Error:', error);
        alert("An error occurred");
        this.isLoading = false;  // Stop loading in case of error
      });
  }
}
