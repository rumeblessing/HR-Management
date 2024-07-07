import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
     HttpClientModule,
     FormsModule  
  ],
  declarations: [
   
  ]
})
export class SharedModule { }
