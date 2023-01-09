import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-personal-task',
  templateUrl: './personal-task.component.html',
  styleUrls: ['./personal-task.component.scss']
})
export class PersonalTaskComponent implements OnInit {
  @Input() todo!: Todo;

  isDone: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDone(checked: boolean) {
    this.isDone = checked;
  }

}
