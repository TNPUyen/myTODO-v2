import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-project-task-col',
  templateUrl: './project-task-col.component.html',
  styleUrls: ['./project-task-col.component.scss']
})
export class ProjectTaskColComponent implements OnInit {

  @Input() colTitle!: string;
  @Input() colListTask!: TaskModel[];
  @Input() colDragListTask!: TaskModel[];
  @Input() colConnectedDoneList: string[] = [];
  @Output() updateTaskStatusEvent: EventEmitter<TaskModel> =
    new EventEmitter<TaskModel>();
  @Output() deleteTaskStatusEvent: EventEmitter<TaskModel> =
    new EventEmitter<TaskModel>();

  @ViewChild('projectTask') projectTask!: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.projectTask);
  }

  updateTaskEvent(task: TaskModel){
    this.updateTaskStatusEvent.emit(task);
  }

  deleteTaskEvent(task: TaskModel){
    this.deleteTaskStatusEvent.emit(task);
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

  getConnectedList(): string {
    if(this.colTitle == "To do"){
      return this.colConnectedDoneList[1];
    }
    if(this.colTitle == "Done"){
      return this.colConnectedDoneList[1];
    }
    return '';
    // return this.colConnectedDoneList[2];
  }

}
