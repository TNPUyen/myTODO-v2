import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }
  isPicked: boolean = false;
  isToday: boolean = false;
  today: Date = new Date();

  // calendar variables
  days: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  firstDay: number = new Date(this.year, this.month, 1).getDay();
  lastDay: number = new Date(this.year, this.month + 1, 0).getDay();
  daysInMonth: number = new Date(this.year, this.month + 1, 0).getDate();
  daysInPrevMonth: number = new Date(this.year, this.month, 0).getDate();
  daysInNextMonth: number = new Date(this.year, this.month + 2, 0).getDate();
  daysInCalendar: number = this.daysInMonth + this.firstDay + (6 - this.lastDay);
  calendar: number[] = [];
  week: number[] = [];

  ngOnInit(): void {
    this.isToday = this.today.getDate() == new Date().getDate() && this.today.getMonth() == new Date().getMonth() && this.today.getFullYear() == new Date().getFullYear();
    console.log(this.today.getMonth());
  }
  
  pickedDate(index: number){
    this.isPicked = true;
  }

  generateMonth(){

  }

  // create a function that will generate the calendar
  
}
