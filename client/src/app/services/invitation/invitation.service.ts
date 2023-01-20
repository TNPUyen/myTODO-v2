import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvitationModel } from 'src/app/models/invitation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private apiUrl = environment.apiUrl+"/invitations";
  
  constructor(private http: HttpClient,) { }

  getInvitations(){
    return this.http.get(`${this.apiUrl}/all`) as Observable<InvitationModel[]>;
  }

  getInvitation(invitation_id: string | null){
    return this.http.get(`${this.apiUrl}/${invitation_id}`) as Observable<InvitationModel>;
  }

  getInvitationsByUserId(uid: string){
    return this.http.get(`${this.apiUrl}/byUser/${uid}`) as Observable<InvitationModel[]>;
  }

  getInvitationsByProjectId(project_id: string){
    return this.http.get(`${this.apiUrl}/project/${project_id}`) as Observable<InvitationModel[]>;
  }

  createInvitation(newInvitation: InvitationModel) {
    return this.http.post(`${this.apiUrl}`, newInvitation) as Observable<string>;
  }

  updateInvitationById(invitation_id: string, updatedInvitation: any) {
    return this.http.put(`${this.apiUrl}/${invitation_id}`, updatedInvitation);
  }

  deleteInvitationById(invitation_id: string) {
    return this.http.delete(`${this.apiUrl}/${invitation_id}`)  as Observable<string>;
  }
  
}
