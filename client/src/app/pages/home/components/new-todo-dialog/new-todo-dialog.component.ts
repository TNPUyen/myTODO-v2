import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-new-todo-dialog',
  templateUrl: './new-todo-dialog.component.html',
  styleUrls: ['./new-todo-dialog.component.scss'],
})
export class NewTodoDialogComponent implements OnInit {
  newTodoContent: string = '';
  owner!: string | null;
  todoDate: Date = new Date();

  constructor(
    public ref: NbDialogRef<NewTodoDialogComponent>,
    private todoService: TodoService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {}

  addNewTodo() {
    this.newTodoContent = this.newTodoContent.trim();
    if(this.dayInThePast()){
      this.toastrService.show('Error', 'Date is in the past!!', {
        status: 'danger',
      });
      return;
    }
    if (this.newTodoContent.length > 0) {
      let newTodo = {
        todo_id: Date.now().toString(),
        content: this.newTodoContent,
        todo_date: this.todoDate.getTime(),
        status: false,
      };
      this.todoService
        .createTodo(newTodo, this.owner)
        .subscribe((todo) => {
          this.toastrService.show('Success', 'Created successfully!!', {
            status: 'success',
          });
        });

      this.ref.close(newTodo);
      return;
    }
    this.toastrService.show('Error', 'Content is empty!!', {
      status: 'danger',
    });
  }

  dayInThePast() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.todoDate < today;
  }
}
