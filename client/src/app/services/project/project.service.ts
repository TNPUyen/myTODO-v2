import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from 'src/app/models/project.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.apiUrl+"/projects";

  projectInfo!: ProjectModel;

  constructor(private http: HttpClient,) { }

  getProjects(){
    return this.http.get(`${this.apiUrl}/all`) as Observable<ProjectModel[]>;
  }

  getProject(project_id: string | null){
    return this.http.get(`${this.apiUrl}/${project_id}`) as Observable<ProjectModel>;
  }

  getProjectsByUserId(uid: string){
    return this.http.get(`${this.apiUrl}/owner/${uid}`) as Observable<ProjectModel[]>;
  }

  getProjectsByJoinedUserId(uid: string){
    return this.http.get(`${this.apiUrl}/joined/${uid}`) as Observable<ProjectModel[]>;
  }

  createProject(newProject: any) {
    return this.http.post(`${this.apiUrl}`, newProject) as Observable<string>;
  }

  updateProjectById(project_id: string, updatedProject: any) {
    return this.http.put(`${this.apiUrl}/${project_id}`, updatedProject);
  }

  deleteProjectById(project_id: string) {
    return this.http.delete(`${this.apiUrl}/${project_id}`)  as Observable<string>;
  }

}
