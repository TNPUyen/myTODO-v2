import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProjectModel } from 'src/app/models/project.model';
import { TaskModel } from 'src/app/models/task.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';
import { ProjectInfoDialogComponent } from './components/project-info-dialog/project-info-dialog.component';
import { ShareProjectDialogComponent } from './components/share-project-dialog/share-project-dialog.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  projectInfo!: ProjectModel;
  tasks: TaskModel[] = [];
  todoTasks: TaskModel[] = [];
  doingTasks: TaskModel[] = [];
  doneTasks: TaskModel[] = [];
  colTasks = [
    "todoList",
    "doingList",
    "doneList",
  ]
  // user!: User;

  constructor(
    private route: ActivatedRoute, 
    private projectService: ProjectService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService, 
    public taskService: TaskService,
    public userService: UserService,
    ) { }

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');
    
    this.projectService.getProject(this.route.snapshot.paramMap.get('id')).subscribe((projectInfo) =>{
      this.userService.getUserById(projectInfo.owner).subscribe((res) => {
        projectInfo.members.push(res)
      })
      this.projectService.projectInfo = projectInfo
      this.projectInfo = projectInfo
      this.taskService.getTasksByProjectId(projectInfo.project_id).subscribe((res) =>{
        if(res){
          this.tasks = res.reverse();
          this.filterTasks();
        }
      });
    })
  }

  goBack() {
    window.history.back();
  }

  filterTasks(){
    this.todoTasks = this.tasks.filter((task) => task.status === 0);
    this.doingTasks = this.tasks.filter((task) => task.status === 1);
    this.doneTasks = this.tasks.filter((task) => task.status === 2);
  }

  openAddTaskDialog(){
    this.dialogService.open(NewTaskDialogComponent, {
      context: {
        project: this.projectInfo,
      },
    }).onClose.subscribe((task: TaskModel) => {
      if(task){
        this.todoTasks.unshift(task);
      }
    });
  } 

  openShareDialog(){
    this.dialogService.open(ShareProjectDialogComponent, {
      context: {
        project: this.projectInfo,
      },
    });
  } 

  openProjectInfoDialog(){
    this.dialogService.open(ProjectInfoDialogComponent, {
      context: {
        project: this.projectInfo,
      },
    });
  } 

  updateTaskStatusEvent(task: TaskModel){
    this.taskService.getTasksByProjectId(this.projectInfo.project_id).subscribe((res) =>{
      if(res){
        this.tasks = res;
        this.filterTasks();
      }
    });
  }

  deleteTaskStatusEvent(task: TaskModel){
    this.taskService.getTasksByProjectId(this.projectInfo.project_id).subscribe((res) =>{
      if(res){
        this.tasks = res;
        this.filterTasks();
      }
    });
  }

  deleteProject(){
    if(this.userService.user.uid === this.projectInfo.owner){
      this.taskService.deleteTasksByProjectId(this.projectInfo.project_id).subscribe(
        () => {}
      );

      this.projectService.deleteProjectById(this.projectInfo.project_id).subscribe(
        (res) => {
          this.toastrService.show('Success', res, {
            status: 'success',
          });
        }
      )
      window.history.back();
      return;
     }
      this.toastrService.show('Error', 'You are not the owner of this project', {
        status: 'danger',
      });
      return;
     
  }
  
  // updateTaskEvent(task: TaskModel){
  //   this.updateTaskStatusEvent.emit(task);
  // }

  // deleteTaskEvent(task: TaskModel){
  //   this.deleteTaskStatusEvent.emit(task);
  // }

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
