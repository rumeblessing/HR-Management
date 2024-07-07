import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-Holiday',
  templateUrl: './Holiday.component.html',
  styleUrls: ['./Holiday.component.css'],
  providers: [DatePipe]
})
export class HolidayComponent implements OnInit {
  holidays: any[] = [];
  constructor(public apiservices: ApiserviceService, private datePipe: DatePipe, private fb: FormBuilder, private router: Router,) { }

  ngOnInit() {
    this.getHolidays();
  }

  getHolidays(){
    this.apiservices.getHolidays().subscribe(data => {
      console.log(data, "Holiday")
      this.holidays = data.response.holidays;
    });

  }
  getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // handle 11th to 20th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  
  formatDate(date: string): string | null {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate();
    const dayWithSuffix = day + this.getOrdinalSuffix(day);
    const month = this.datePipe.transform(parsedDate, 'MMMM');
    const year = this.datePipe.transform(parsedDate, 'yyyy');
    // const weekday = this.datePipe.transform(parsedDate, 'EEEE');
  
    return `${dayWithSuffix} ${month}, ${year}`;
    // return `${weekday}, ${dayWithSuffix} ${month}, ${year}`;
  }
  
  formatDateDay(date: string): string | null {
    const parsedDate = new Date(date);
    const weekday = this.datePipe.transform(parsedDate, 'EEEE');

    return weekday;
  }
  navigateToHome(){
    this.router.navigate(['setup/homescreen']);
  }
}
