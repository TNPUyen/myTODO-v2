import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  isAddNew: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addNewTask(){
    this.isAddNew = true;
    console.log(this.isAddNew);

  }
}
