import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NewTodoDialogComponent } from '../new-todo-dialog/new-todo-dialog.component';

@Component({
  selector: 'app-floating-btn',
  templateUrl: './floating-btn.component.html',
  styleUrls: ['./floating-btn.component.scss']
})
export class FloatingBtnComponent implements OnInit {
  @Input() owner!: string | null;

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  openAddNew() {
    this.dialogService.open(NewTodoDialogComponent,
      {
        context: {
          owner: this.owner,
        }
      });
  }
}
