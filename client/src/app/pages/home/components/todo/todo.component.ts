import { Component, Input, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo!: TodoModel;
  
  isDone: boolean = false;
  isEdit: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleDone(checked: boolean, todoId: string) {
    // this.isDone = checked;
    // this.todo.status = this.isDone;
    // this.todoService
    //   .updateTodoStatusById(todoId, this.todo)
    //   .subscribe((todo: TodoModel) => {
    //     this.toastrService.show('Success', 'Updated successfully!!', {
    //       status: 'success',
    //     });
    //   });
  }

  saveEdit(todoId: string) {
    // if (this.todo.content != '') {
    //   // this.todo.content
    //   this.todoService
    //     .updateTodoById(todoId, this.todo)
    //     .subscribe((todo: TodoModel) => {
    //       this.toastrService.show('Success', 'Created successfully!!', {
    //         status: 'success',
    //       });
    //     });
    //   this.isEdit = false;
    //   return;
    // }
    // this.toastrService.show('Error', 'Content is empty!!', {
    //   status: 'danger',
    // });
  }

  deleteTodoById(todoId: string) {
    // this.todoService.deleteTodoById(todoId).subscribe((todo) => {
    //   if (todo == 'Deleted') {
    //     this.toastrService.show('Success', 'Deleted successfully!!', {
    //       status: 'success',
    //     });
    //     this.deleteTodoEvent.emit(todoId);
    //   }
    // });
  }

}
