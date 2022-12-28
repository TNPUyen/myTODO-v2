import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filterOption = 0;
    
  date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  filterOptionChanged(option: number) {
    this.filterOption = option;
  }

}
