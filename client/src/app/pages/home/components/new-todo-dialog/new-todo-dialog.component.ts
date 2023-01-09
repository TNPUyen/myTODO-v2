import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Todo } from 'src/app/models/todo.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-todo-dialog',
  templateUrl: './new-todo-dialog.component.html',
  styleUrls: ['./new-todo-dialog.component.scss']
})
export class NewTodoDialogComponent implements OnInit {

  newTodoContent: string = '';
  owner!: string | null;

  constructor(public ref:NbDialogRef<NewTodoDialogComponent>,
    private todoService: TodoService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  addNewTodo() {
    this.newTodoContent = this.newTodoContent.trim();
    if (this.newTodoContent.length > 0) {
      this.userService.getUserByEmail(this.owner).subscribe(user => {
        this.todoService.createTodo(this.newTodoContent, user.id).subscribe(todo => {
          console.log(todo);
          this.toastrService.show('Success', 'Created successfully!!', {
            status: 'success',
          });
        });
      });
      
      this.ref.close();
      return;
    }
    this.toastrService.show('Error', 'Content is empty!!', {  status: 'danger' });
  }

}
