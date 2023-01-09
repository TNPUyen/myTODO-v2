import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl+"/todos";

  constructor(private http: HttpClient,) { }

  getTodos() {
    return this.http.get(`${this.apiUrl}/all`) as Observable<Todo[]>;
  }

  getTodoById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`) as Observable<Todo>;
  }

  getTodosByUserId(id: string) {
    return this.http.get(`${this.apiUrl}/status/${id}`) as Observable<Todo[]>;
  }

  createTodo(content: string, user_id: string | null) {
    let newTodo = {
      content: content,
    }
    const body = {todo: newTodo, user: user_id}
    return this.http.post(`${this.apiUrl}/`, body) as Observable<Todo>;
  }

}
