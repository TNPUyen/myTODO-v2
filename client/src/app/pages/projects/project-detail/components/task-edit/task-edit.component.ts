import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ProjectModel } from 'src/app/models/project.model';
import { TaskModel } from 'src/app/models/task.model';
import { UserModel } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  task!: TaskModel;
  project!: ProjectModel;
  selectedAssignee!: any;
  selectedStatus!: number;
  newTaskTitle!: string;
  newTaskDescription!: string;

  statusOptions = [
    { value: 0, label: 'To Do' },
    { value: 1, label: 'In Progress' },
    { value: 2, label: 'Done' },
  ];

  constructor(
    private toastrService: NbToastrService,
    public ref: NbDialogRef<TaskEditComponent>,
    private projectService: ProjectService,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.project = this.projectService.projectInfo;
    this.selectedStatus = this.task.status;
    this.selectedAssignee = this.project.members[this.getAsigneeIndex(this.project)];
    this.newTaskTitle = this.task.name;
    this.newTaskDescription = this.task.description;
  }

  getAsigneeIndex(project: ProjectModel){
    const temp = this.project.members.find(mem => mem.uid === this.task.asignee.uid) as UserModel;
    return project.members.indexOf(temp);
  }

  saveTask(){
    let temp = Math.abs(this.selectedStatus- this.task.status);
    if(temp != 1 && this.selectedStatus != this.task.status){
      this.showWarningStatusTask(temp);
      return;
    }
    let updateTask = {
      name: this.newTaskTitle,
      description: this.newTaskDescription,
      status: this.selectedStatus,
      asignee: this.selectedAssignee,
    }
    this.taskService.updateTaskById(this.task.task_id, updateTask).subscribe((res) => {
      if(res == 'Updated successfully'){
        this.toastrService.success('Task updated successfully', 'Success');
        this.ref.close(updateTask);
      }
    });
  }

  showWarningStatusTask(statusTemp: number){
    switch(statusTemp){
      case 0: this.toastrService.warning('You have to change status into doing first', 'Warning'); break;
      case 2: this.toastrService.warning('You have to change status into doing first', 'Warning'); break;
      default: break;
    }
  }

}
