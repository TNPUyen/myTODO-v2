import { Component, OnInit } from '@angular/core';
import { ProjectPropService } from 'src/app/services/project-prop.service';

@Component({
  selector: 'app-subtask-card',
  templateUrl: './subtask-card.component.html',
  styleUrls: ['./subtask-card.component.scss']
})
export class SubtaskCardComponent implements OnInit {

  isEdit: boolean = false;
  isSharedProjects: any;

  filterStatuses($event: any) {
    throw new Error('Method not implemented.');
  }

  constructor(public projectPropService: ProjectPropService) { }

  ngOnInit(): void {
  }

}
