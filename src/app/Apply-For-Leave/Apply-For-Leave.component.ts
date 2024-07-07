import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-for-leave',
  templateUrl: './apply-for-leave.component.html',
  styleUrls: ['./apply-for-leave.component.css']
})
export class ApplyForLeaveComponent implements OnInit {
  applyLeaveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiservices: ApiserviceService,
    private router: Router
  ) {
    this.applyLeaveForm = this.fb.group({
      EmployeeID: ['', Validators.required],
      EmployeeName: [''],
      DateFrom: ['', Validators.required],
      DateTo: ['', Validators.required],
      LeaveType: ['', Validators.required],
      LeaveReason: ['', Validators.required],
      NumberOfDaysLeave: ['', Validators.required]
    });

    // Subscribe to changes in the date fields
    this.applyLeaveForm.get('DateFrom')?.valueChanges.subscribe(() => {
      this.calculateLeaveDays();
    });
    this.applyLeaveForm.get('DateTo')?.valueChanges.subscribe(() => {
      this.calculateLeaveDays();
    });
  }

  ngOnInit(): void {}

  calculateLeaveDays() {
    const fromDate = this.applyLeaveForm.get('DateFrom')?.value;
    const toDate = this.applyLeaveForm.get('DateTo')?.value;

    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include end date in the count
      this.applyLeaveForm.get('NumberOfDaysLeave')?.setValue(diffDays);
    } else {
      this.applyLeaveForm.get('NumberOfDaysLeave')?.setValue('');
    }
  }

  applyForLeave() {
    console.log('Form Validity:', this.applyLeaveForm.controls);
    console.log('Form Errors:', this.applyLeaveForm.errors);
    console.log('Form Values:', this.applyLeaveForm.value);

    // Log individual form control validity
    for (const control in this.applyLeaveForm.controls) {
      if (this.applyLeaveForm.controls.hasOwnProperty(control)) {
        console.log(`${control} Validity:`, this.applyLeaveForm.get(control)?.valid);
        console.log(`${control} Errors:`, this.applyLeaveForm.get(control)?.errors);
      }
    }

    if (this.applyLeaveForm.valid) {
      this.apiservices.ApplyLeave(this.applyLeaveForm.value).subscribe(
        response => {
          console.log('Response:', response);
          alert("Created successfully");
        },
        error => {
          console.error('Error:', error);
          alert("Error");
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
