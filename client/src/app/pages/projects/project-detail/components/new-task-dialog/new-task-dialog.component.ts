import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbTagComponent, NbTagInputDirective, NbToastrService } from '@nebular/theme';
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

  selectedAssignee: UserModel[] = [];
  selectedLabel!: any;
  project!: ProjectModel;
  taskName: string = '';
  taskDescription: string = '';
  tags: Set<string> = new Set<string>();
  optionLabels = [
    { value: '0', label: 'UI Design' },
    { value: '1', label: 'UX Design' },
    { value: '2', label: 'Marketing' },
    { value: '3', label: 'Back-end' },
    { value: '4', label: 'Front-end' },
  ];

  @ViewChild(NbTagInputDirective, { read: ElementRef })
  tagInput!: ElementRef<HTMLInputElement>;

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

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
  }

  onTagAdd(value: UserModel): void {
    if (value) {
      this.tags.add(value.displayName);
      this.selectedAssignee.push(value);
      // this.options = this.options.filter((o) => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

}
