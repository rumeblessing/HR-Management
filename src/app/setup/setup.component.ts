import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  isExpanded: boolean = false;

  constructor(public apiservices: ApiserviceService, fb: FormBuilder, private router: Router) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
  ngOnInit() {
  }

}
