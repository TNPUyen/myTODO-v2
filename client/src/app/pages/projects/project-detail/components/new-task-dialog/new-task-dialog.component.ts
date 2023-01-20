import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ProjectModel } from 'src/app/models/project.model';
import { TaskModel } from 'src/app/models/task.model';
import { UserModel } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent implements OnInit {

  selectedAssignee!: UserModel;
  project!: ProjectModel;
  taskName: string = '';
  taskDescription: string = '';

  constructor(
    public ref: NbDialogRef<NewTaskDialogComponent>,
    private toastrService: NbToastrService,
    private taskService: TaskService,
  ) { 
    
  }

  ngOnInit(): void {
  }

  createTask(){
    if(this.taskName == '' || this.taskDescription == '' || this.selectedAssignee == null){
      this.toastrService.danger('Please fill in all the fields!', 'Error');
      return;
    }
    let newTask: TaskModel = {
      id: '',
      project_id: this.project.project_id,
      name: this.taskName,
      task_id: Date.now().toString(),
      description: this.taskDescription,
      asignee: this.selectedAssignee,
      status: 0,
      created_at: Date.now(),
      updated_at: Date.now()
    }
    this.taskService.createTask(newTask).subscribe((res) => {
      if(res == "Created successfully"){
        this.toastrService.success('Task created successfully!', 'Success');
        this.ref.close(newTask);
      }
    });
  }

}
