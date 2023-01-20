import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NbDialogService } from '@nebular/theme';
import { ProjectModel } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { UserService } from 'src/app/services/user/user.service';
import { NewProjectDialogComponent } from './components/new-project-dialog/new-project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  // user!: User;

  ownedProjects: ProjectModel[] = [];
  sharedProjects: ProjectModel[] = [];
  projectRendered: ProjectModel[] = [];

  isSharedProjects: string = '0';

  constructor(
    private dialogService: NbDialogService,
    private projectService: ProjectService,
    public userService: UserService,
  ) {
    // this.authService.getAuthState().subscribe((user) => {
    //   if (user) {
    //     this.user = user;
    //     this.userShortName = this.user.displayName?.split(' ')[0] || 'User';
    //   }
    // });
  }

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.projectService
      .getProjectsByUserId(this.userService.user.uid)
      .subscribe((projects) => {
        if(projects != null){
          this.ownedProjects = projects;
          this.projectRendered = this.ownedProjects;
        }
  });

    this.projectService
      .getProjectsByJoinedUserId(this.userService.user.uid)
      .subscribe((projects) => {
        if(projects != null){
          this.sharedProjects = projects;
        }
      });
  }

  filterProjects(event: string) {
    if (event === '0') {
      if(this.ownedProjects != null){
        this.projectRendered = this.ownedProjects;
      }else{
        this.projectRendered = [];
      }
    } else {
      if(this.sharedProjects != null){
        this.projectRendered = this.sharedProjects;
      }else{
        this.projectRendered = [];
      }
    }
  }

  openAddNewDialog() {
    this.dialogService
      .open(NewProjectDialogComponent, {
        context: {
          owner_id: this.userService.user.uid,
        },
      })
      .onClose.subscribe((newProject) => {
          this.ownedProjects.push(newProject);
          if(this.isSharedProjects == '0'){
            this.projectRendered = this.ownedProjects;
          }
      });
  }

  deleteProjectEvent(project: any) {
    this.projectRendered.forEach((p) => {
      if (p.project_id === project.project_id) {
        this.projectRendered.splice(this.projectRendered.indexOf(p), 1);
      }
    });
  }
}
