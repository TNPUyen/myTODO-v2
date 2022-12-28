import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-task',
  templateUrl: './personal-task.component.html',
  styleUrls: ['./personal-task.component.scss']
})
export class PersonalTaskComponent implements OnInit {

  isDone: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDone(checked: boolean) {
    this.isDone = checked;
  }

}
