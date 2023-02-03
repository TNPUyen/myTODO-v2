import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { TodoModel } from 'src/app/models/todo.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  filterOption = 0;
  // user!: User;
  todoList: TodoModel[] = [];
  todoFilterByDate: TodoModel[] = [];
  todoFilterByOption: TodoModel[] = [];
  userShortName!: string;
  pickedDate: Date = new Date();
  isCheckAll: boolean = false;

  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    public userService: UserService
  ) {
    // this.authService.getAuthState().subscribe((user) => {
    //   if (user) {
    //     this.user = user;
       
    //   }
    // });
  }

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');
     this.userShortName = this.userService.user.displayName?.split(' ')[0] || 'User';
     if (this.userService.user) {
      this.todoService.getTodosByUserId(this.userService.user.uid).subscribe((todos) => {
        if(todos !== null) {
          this.todoList = todos.reverse();
          this.getTodosByUserId();
        }else{
          this.todoList = [];
        }
      });
    }
  }

  getTodosByUserId() {
    this.todoFilterByDate = this.todoList.filter((todo) => {
      return (
        new Date(todo.todo_date).toDateString() ===
        this.pickedDate.toDateString()
      );
    });
    this.filterOptionChanged(this.filterOption);
    this.allReadyDoneAll();
  }

  allReadyDoneAll() {
    this.isCheckAll = this.todoFilterByOption.every((todo) => {
      return todo.status === true;
    });
  }


  filterOptionChanged(option: number) {
    this.filterOption = option;
    if (option === 0) {
      this.todoFilterByOption = this.todoFilterByDate;
    }

    if (option === 1) {
      this.todoFilterByOption = this.todoFilterByDate.filter((todo) => {
        return todo.status === false;
      });
    }

    if (option === 2) {
      this.todoFilterByOption = this.todoFilterByDate.filter((todo) => {
        return todo.status === true;
      });
    }
  }

  filterByDate(pickedDate: Date) {
    this.todoFilterByDate = this.todoList.filter((todo) => {
      return (
        new Date(todo.todo_date).toDateString() === pickedDate.toDateString()
      );
    });
    this.filterOptionChanged(this.filterOption);
  }

  addNewTodoToday(newTodo: any) {
    if (
      new Date(newTodo.todo_date).toDateString() ===
      this.pickedDate.toDateString()
    ) {
      this.todoFilterByDate.unshift(newTodo);
      this.filterOptionChanged(this.filterOption);
      this.todoService.getTodosByUserId(this.userService.user.uid).subscribe((todos) => {
        if(todos !== null) {
          this.todoList = todos.reverse();
          this.getTodosByUserId();
        }else{
          this.todoList = [];
        }
      });
    }
    if(this.isCheckAll) {
      this.isCheckAll = false;
    }
  }

  checkAllTodoDone() {
    if (!this.isCheckAll) {
      this.todoFilterByDate.forEach((todo) => {
        if (todo.status === false) {
          todo.status = true;
          this.todoService.updateTodoStatusById(todo.todo_id, todo)
          .subscribe(() => {});
        }
      });
    } else {
      this.todoFilterByDate.forEach((todo) => {
        todo.status = false;
        this.todoService.updateTodoStatusById(todo.todo_id, todo)
          .subscribe(() => {});
        return;
      });
    }
    this.isCheckAll = !this.isCheckAll;
    this.filterOptionChanged(this.filterOption);
  }

  deleteTodoEvent(todoID: string) {
    let temp  = this.todoFilterByDate.find(todo => todo.todo_id == todoID) as TodoModel;
    this.todoFilterByDate.splice(this.todoFilterByDate.indexOf(temp), 1);
    this.filterOptionChanged(this.filterOption);
  }

  deleteMultipleTodo() {
    let temp = this.todoFilterByDate
    temp.forEach((todo) => {
      if (todo.status === true) {
        this.todoService.deleteTodoById(todo.todo_id).subscribe(() => {});
        this.todoFilterByDate = temp.splice(
          temp.indexOf(todo),
          1
        );
    console.log(this.todoFilterByDate);

      }
    });
    

    this.filterOptionChanged(this.filterOption);
  }
}
