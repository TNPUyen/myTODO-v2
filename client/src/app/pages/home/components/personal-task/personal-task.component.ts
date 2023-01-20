import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-personal-task',
  templateUrl: './personal-task.component.html',
  styleUrls: ['./personal-task.component.scss'],
})
export class PersonalTaskComponent implements OnInit {
  @Input() todo!: TodoModel;
  @Output() deleteTodoEvent: EventEmitter<any> = new EventEmitter<any>();

  isDone: boolean = false;
  isEdit: boolean = false;

  constructor(
    private todoService: TodoService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {}

  toggleDone(checked: boolean, todoId: string) {
    this.isDone = checked;
    this.todo.status = this.isDone;
    this.todoService
      .updateTodoStatusById(todoId, this.todo)
      .subscribe((todo: TodoModel) => {
        this.toastrService.show('Success', 'Updated successfully!!', {
          status: 'success',
        });
      });
  }

  saveEdit(todoId: string) {
    if (this.todo.content != '') {
      // this.todo.content
      this.todoService
        .updateTodoById(todoId, this.todo)
        .subscribe((todo: TodoModel) => {
          this.toastrService.show('Success', 'Created successfully!!', {
            status: 'success',
          });
        });
      this.isEdit = false;
      return;
    }
    this.toastrService.show('Error', 'Content is empty!!', {
      status: 'danger',
    });
  }

  deleteTodoById(todoId: string) {
    this.todoService.deleteTodoById(todoId).subscribe((todo) => {
      if (todo == 'Deleted') {
        this.toastrService.show('Success', 'Deleted successfully!!', {
          status: 'success',
        });
        this.deleteTodoEvent.emit(todoId);
      }
    });
  }
}
