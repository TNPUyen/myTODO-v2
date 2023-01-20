import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-project-task-col',
  templateUrl: './project-task-col.component.html',
  styleUrls: ['./project-task-col.component.scss']
})
export class ProjectTaskColComponent implements OnInit {

  @Input() colTitle!: string;
  @Input() colListTask!: TaskModel[];
  @Output() updateTaskStatusEvent: EventEmitter<TaskModel> =
    new EventEmitter<TaskModel>();
  @Output() deleteTaskStatusEvent: EventEmitter<TaskModel> =
    new EventEmitter<TaskModel>();
  constructor() { }

  ngOnInit(): void {
  }

  updateTaskEvent(task: TaskModel){
    this.updateTaskStatusEvent.emit(task);
  }

  deleteTaskEvent(task: TaskModel){
    this.deleteTaskStatusEvent.emit(task);
  }

}
