import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-task-col',
  templateUrl: './project-task-col.component.html',
  styleUrls: ['./project-task-col.component.scss']
})
export class ProjectTaskColComponent implements OnInit {

  @Input() colTitle!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
