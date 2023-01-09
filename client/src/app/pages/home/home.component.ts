import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Todo } from 'src/app/models/todo.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filterOption = 0;
  user!: User;
  date = new Date();
  todoList!: Todo[];

  constructor(private authService: AuthService,
    private todoService: TodoService
    ) {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    });
   }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todoList = todos;
      console.log(this.todoList);
    })
  }

  filterOptionChanged(option: number) {
    this.filterOption = option;
  }

}
