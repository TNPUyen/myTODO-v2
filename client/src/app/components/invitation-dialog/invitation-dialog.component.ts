import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NbDialogRef } from '@nebular/theme';
import { InvitationModel } from 'src/app/models/invitation.model';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss']
})
export class InvitationDialogComponent implements OnInit {
  // user!: User;
  invitations: InvitationModel[] = [];
  countUnReadInvitations: number = 0;
  constructor(
    public ref: NbDialogRef<InvitationDialogComponent>,
    private invitationService: InvitationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.invitations = this.invitationService.invitations;
    // this.getUnReadInvitations();
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // this.invitationService.getInvitationsByUserId(this.userService.user.uid).subscribe(invitations => {
    //   if(invitations){
    //     this.invitations = invitations.reverse();
    //     this.countUnReadInvitations = this.invitations.filter(invitation => invitation.unread).length;
    //     console.log(this.countUnReadInvitations);
    //   }
    // });
  }

  getUnReadInvitations(){
    console.log('go')
    this.invitationService.invitations.forEach(invitation => {
      if(invitation.unread){
        invitation = {...invitation, unread: false};
        this.invitationService.countUnReadInvitations--;
        this.invitationService.updateInvitationById(invitation.id, invitation);
      }
    });
    console.log(this.invitationService.invitations)
  }


  repliedInvitationEvent(event: any){
    this.invitations.splice(this.invitations.indexOf(event), 1);
  }

}
