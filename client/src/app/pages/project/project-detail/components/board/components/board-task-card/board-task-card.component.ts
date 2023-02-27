import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { EditTaskProjectDialogComponent } from 'src/app/pages/project/components/edit-task-project-dialog/edit-task-project-dialog.component';

@Component({
  selector: 'app-board-task-card',
  templateUrl: './board-task-card.component.html',
  styleUrls: ['./board-task-card.component.scss']
})
export class BoardTaskCardComponent implements OnInit {
  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  openEditTask() {
    this.dialogService.open(EditTaskProjectDialogComponent);
  }

}
