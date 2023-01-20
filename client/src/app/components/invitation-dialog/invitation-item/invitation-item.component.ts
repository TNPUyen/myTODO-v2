import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { InvitationModel } from 'src/app/models/invitation.model';
import { UserModel } from 'src/app/models/user.model';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { NotiService } from 'src/app/services/noti/noti.service';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationModel } from 'src/app/models/notification.model';
import { ProjectModel } from 'src/app/models/project.model';

@Component({
  selector: 'app-invitation-item',
  templateUrl: './invitation-item.component.html',
  styleUrls: ['./invitation-item.component.scss']
})
export class InvitationItemComponent implements OnInit {

  @Input() invitation!: InvitationModel;
  @Output() repliedInvitationEvent: EventEmitter<InvitationModel> = new EventEmitter<InvitationModel>();
  sender!: UserModel
  currentUser!: UserModel;
  tempProject!: ProjectModel;
  constructor(
    private userService: UserService, 
    private invitationService: InvitationService,
    private toastr: NbToastrService,
    private projectService: ProjectService,
    private notiService: NotiService
    ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.invitation.owner_id).subscribe(user => {  
      this.sender = user;
    });
    this.userService.getUserById(this.userService.user.uid).subscribe(user => {  
      this.currentUser = user;
    });
    this.projectService.getProject(this.invitation.project.project_id).subscribe(
      project => {
        this.tempProject = project;
      }
    );
  }

  replyInvitation(isAgree: number) {
    this.invitation.status =  isAgree;
    this.invitationService.updateInvitationById(this.invitation.id, this.invitation).subscribe(
      invitation => {
        this.invitationService.deleteInvitationById(this.invitation.id).subscribe(
          invitation => {
            this.toastr.success('Invitation has been replied', 'Success');
            this.repliedInvitationEvent.emit(this.invitation);
          }
        );
      }
    );
    this.addMemToProject(isAgree);
  }

  addMemToProject(isAgree: number) {
    if(isAgree == 1) {
      this.tempProject.members.push(this.currentUser);
      
      this.projectService.updateProjectById(this.invitation.project.project_id, this.tempProject).subscribe(
        invitation => {
          this.toastr.success('Member has been added to project', 'Success');
        }
      );
      this.createNotification(isAgree);
    }
  }

  createNotification(isAgree: number) {
    let noti: NotificationModel = {
      id: '',
      owner_id: this.userService.user.uid,
      receiver_id: this.sender.uid,
      invitation_id: Date.now().toString(),
      status: 0,
      project: this.invitation.project,
    };
    if(isAgree == 1) {
       noti.status = 1;
    }
    this.notiService.createNoti(noti).subscribe(
      notification => {
        this.toastr.success('Notification has been created', 'Success');
      });
  }

}
