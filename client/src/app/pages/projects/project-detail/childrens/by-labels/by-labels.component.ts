import { Component, OnInit } from '@angular/core';
import { ProjectPropService } from 'src/app/services/project-prop.service';

@Component({
  selector: 'app-by-labels',
  templateUrl: './by-labels.component.html',
  styleUrls: ['./by-labels.component.scss']
})
export class ByLabelsComponent implements OnInit {

  selectedOption = 0;

  // optionLabels = [
  //   { value: '0', label: 'All' },
  //   { value: '1', label: 'UI Design' },
  //   { value: '2', label: 'UX Design' },
  //   { value: '3', label: 'Marketing' },
  //   { value: '4', label: 'Back-end' },
  //   { value: '5', label: 'Front-end' },
  // ];

  constructor(public projectPropService: ProjectPropService) { }

  ngOnInit(): void {
  }

  selectedOptionChange(index: number) {
    this.selectedOption = index;
  }

}
