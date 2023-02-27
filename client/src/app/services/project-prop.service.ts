import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectPropService {

  statusTask = [
    { value: '0', label: 'To do' },
    { value: '1', label: 'In progress' },
    { value: '2', label: 'Verified' },
    { value: '3', label: 'Done' },
  ];

  labelsTask = [
    { value: '0', label: 'Design' },
    { value: '1', label: 'Management' },
    { value: '2', label: 'Marketing' },
    { value: '3', label: 'Server' },
    { value: '4', label: 'Website' },
    { value: '5', label: 'Presentation' },
    { value: '6', label: 'Mobile' },
  ];

  taskPriorities = [
    { value: '0', label: 'Normal' },
    { value: '1', label: 'Low' },
    { value: '2', label: 'Medium' },
    { value: '2', label: 'High' },
  ]

  constructor() { }
}
