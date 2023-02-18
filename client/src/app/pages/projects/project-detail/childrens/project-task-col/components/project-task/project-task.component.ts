import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskEditComponent } from '../../../../components/task-edit/task-edit.component';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss'],
})
export class ProjectTaskComponent implements OnInit {
  @Input() task!: TaskModel;
  @Output() updateTaskEvent: EventEmitter<TaskModel> =
    new EventEmitter<TaskModel>();
  @Output() deleteTaskEvent: EventEmitter<TaskModel> =
    new EventEmitter<TaskModel>();

  constructor(
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void { }

  openTaskEditDialog() {
    this.dialogService
      .open(TaskEditComponent, {
        context: {
          task: this.task,
        },
      })
      .onClose.subscribe((res) => {
        if (res) {
          this.updateTaskEvent.emit(res);
        }
      });
  }

  deleteTask() {
    this.taskService.deleteTaskById(this.task.task_id).subscribe((res) => {
      if (res == 'Deleted successfully') {
        this.toastrService.success('Task deleted successfully', 'Success');
        this.deleteTaskEvent.emit(this.task);
      }
    });
  }
}
