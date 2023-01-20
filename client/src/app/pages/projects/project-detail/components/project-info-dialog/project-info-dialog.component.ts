import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ProjectModel } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-info-dialog',
  templateUrl: './project-info-dialog.component.html',
  styleUrls: ['./project-info-dialog.component.scss']
})
export class ProjectInfoDialogComponent implements OnInit {

  project!: ProjectModel;


  constructor(
    public ref: NbDialogRef<ProjectInfoDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

}
