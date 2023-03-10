import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  isAddNew: boolean = false;

  tasks: TaskModel[] = [];
  todoTasks: TaskModel[] = [];
  doingTasks: TaskModel[] = [];
  verifiedTasks: TaskModel[] = [];
  doneTasks: TaskModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addNewTask() {
    this.isAddNew = true;
    console.log(this.isAddNew);

  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
