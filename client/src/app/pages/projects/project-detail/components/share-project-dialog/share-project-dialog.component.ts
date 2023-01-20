import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbTagComponent, NbTagInputDirective, NbToastrService } from '@nebular/theme';
import { InvitationModel } from 'src/app/models/invitation.model';
import { ProjectModel } from 'src/app/models/project.model';
import { UserModel } from 'src/app/models/user.model';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-share-project-dialog',
  templateUrl: './share-project-dialog.component.html',
  styleUrls: ['./share-project-dialog.component.scss']
})
export class ShareProjectDialogComponent implements OnInit {
  project!: ProjectModel;


  options: UserModel[] = [];
  tags: Set<string> = new Set<string>();
  members: UserModel[] = [];
  
  @ViewChild(NbTagInputDirective, { read: ElementRef })
  tagInput!: ElementRef<HTMLInputElement>;
  
  constructor(
    public ref: NbDialogRef<ShareProjectDialogComponent>,
    private invitationService: InvitationService,
    private toastrService: NbToastrService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      users.forEach((user, i) => {
        if (user.uid !== this.userService.user.uid) {
          if(this.project.members.find((m) => m.uid === user.uid) == undefined) {
            this.options.push(user);
          }
        }
      });
    });
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

  sendInvite() {
    if(this.members.length === 0) {
      this.toastrService.show('Error', 'No member to invite!!', {
        status: 'danger',
      });
      return;
    }
    this.members.forEach((mem) => {
      let invitation: InvitationModel = {
        id: '',
        owner_id: this.userService.user.uid,
        receiver_id: mem.uid,
        status: 0,
        project: {
          project_id: this.project.project_id,
          name: this.project.name,
          description: this.project.description,
          owner: this.project.owner,
        }
      }
      this.invitationService.createInvitation(invitation).subscribe(
        (res) => {
          this.toastrService.show('Success', 'Invitation sent!!', {
            status: 'success',
          });
        }
      );
    });
    
    this.ref.close();
  }

}
