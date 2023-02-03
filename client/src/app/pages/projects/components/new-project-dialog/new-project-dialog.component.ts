import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  NbDialogRef,
  NbToastrService,
  NbTagComponent,
  NbTagInputDirective,
} from '@nebular/theme';
import { ProjectModel } from 'src/app/models/project.model';
import { UserModel } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { UserService } from 'src/app/services/user/user.service';
import { InvitationModel } from 'src/app/models/invitation.model';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.scss'],
})
export class NewProjectDialogComponent implements OnInit {
  owner_id!: string;
  projectName!: string;
  projectDescription: string = '';
  currentUser!: UserModel;

  options: UserModel[] = [];
  tags: Set<string> = new Set<string>();
  members: UserModel[] = [];

  @ViewChild(NbTagInputDirective, { read: ElementRef })
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    public ref: NbDialogRef<NewProjectDialogComponent>,
    private userService: UserService,
    private toastrService: NbToastrService,
    private projectService: ProjectService,
    private invitationService: InvitationService,
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      users.forEach((user) => {
        if (user.uid !== this.owner_id) {
          this.options.push(user);
        }
      });
    });
    this.userService.getUserById(this.owner_id).subscribe((users) => {
      this.currentUser = users;
   });
  }

  createProject() {
    if (!this.projectName) {
      this.toastrService.show('Error', 'Project name is empty!!', {
        status: 'danger',
      });
      return;
    }
    let newProject: ProjectModel ={
      project_id: Date.now().toString(),
      name: this.projectName,
      description: this.projectDescription,
      owner: this.owner_id,
      members: [],
      created_at: Date.now(),
      updated_at: Date.now(),
      id: ''
    };
   
    if(this.members.length !== 0){
      this.members.forEach((member) => {
        let newInvitation: InvitationModel = {
          id: '',
          project: newProject,
          owner_id: this.owner_id,
          receiver_id: member.uid,
          status: 0,
          project_id: newProject.project_id
        };
        this.inviteMem(newInvitation);
      });
    }

    this.projectService.createProject(newProject).subscribe(
      (res) => {
        this.toastrService.show('Success', 'Project created successfully!!', {
          status: 'success',
        });
      },
    );
    this.ref.close(newProject);
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
  }

  onTagAdd(value: UserModel): void {
    if (value) {
      this.tags.add(value.displayName);
      this.members.push(value);
      this.options = this.options.filter((o) => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

  inviteMem(invitation: InvitationModel){
    this.invitationService.createInvitation(invitation).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
