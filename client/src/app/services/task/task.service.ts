import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl+"/tasks";
  
  constructor(private http: HttpClient,) { }

  getTasks(){
    return this.http.get(`${this.apiUrl}/all`) as Observable<TaskModel[]>;
  }

  getTask(task_id: string | null){
    return this.http.get(`${this.apiUrl}/${task_id}`) as Observable<TaskModel>;
  }

  getTasksByProjectId(project_id: string){
    return this.http.get(`${this.apiUrl}/byProject/${project_id}`) as Observable<TaskModel[]>;
  }

  createTask(newTask: TaskModel) {
    return this.http.post(`${this.apiUrl}`, newTask) as Observable<string>;
  }

  updateTaskById(task_id: string, updatedTask: any) {
    return this.http.put(`${this.apiUrl}/${task_id}`, updatedTask) as Observable<string>;
  }

  deleteTaskById(task_id: string) {
    return this.http.delete(`${this.apiUrl}/${task_id}`)  as Observable<string>;
  }
  deleteTasksByProjectId(project_id: string) {
    return this.http.delete(`${this.apiUrl}/byProject/${project_id}`)  as Observable<string>;
  }
  
}
