import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TodoModel } from 'src/app/models/todo.model';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl+"/todos";

  constructor(private http: HttpClient,) { }

  getTodos() {
    return this.http.get(`${this.apiUrl}/all`) as Observable<TodoModel[]>;
  }

  getTodoById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`) as Observable<TodoModel>;
  }

  getTodosByUserId(uid: string) {
    return this.http.get(`${this.apiUrl}/byUser/${uid}`) as Observable<TodoModel[]>;
  }

  createTodo(newTodo: any,  user_id: string | null) {
    // let newTodo = {
    //   content: content,
    //   todoDate: todoDate,
    // }
    const body = {todo: newTodo, user: user_id}
    return this.http.post(`${this.apiUrl}/`, body) as Observable<TodoModel>;
  }

  updateTodoById(id: string, updatedTodo: TodoModel) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedTodo) as Observable<TodoModel>;
  }

  updateTodoStatusById(id: string, updatedTodo: TodoModel) {
    return this.http.put(`${this.apiUrl}/status/${id}`, updatedTodo) as Observable<TodoModel>;
  }

  // updateMultipleTodosStatus(todoIds: string[], status: boolean) {
  //   const body = {todoIds: todoIds, status: status}
  //   return this.http.put(`${this.apiUrl}/statusAll/${status}`, {todoIds: todoIds, status: status}) as Observable<TodoModel[]>;
  // }

  deleteMultipleTodos(todoIds: string[]) {
    return this.http.delete(`${this.apiUrl}/`, {params: {todoIds: todoIds}}) as Observable<TodoModel[]>;
  }

  deleteTodoById(id: string) {
    console.log(id);
    return this.http.delete(`${this.apiUrl}/${id}`) as Observable<string>;
  }

}
