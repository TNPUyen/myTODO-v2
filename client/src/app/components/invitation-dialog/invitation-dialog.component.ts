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
  constructor(
    public ref: NbDialogRef<InvitationDialogComponent>,
    private invitationService: InvitationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.invitationService.getInvitationsByUserId(this.userService.user.uid).subscribe(invitations => {
      this.invitations = invitations.reverse();
    });
  }

  repliedInvitationEvent(event: any){
    this.invitations.splice(this.invitations.indexOf(event), 1);
  }

}
