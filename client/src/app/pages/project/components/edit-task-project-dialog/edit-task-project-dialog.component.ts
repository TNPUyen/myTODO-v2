import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { UserModel } from 'src/app/models/user.model';
import { ProjectPropService } from 'src/app/services/project-prop.service';

@Component({
  selector: 'app-edit-task-project-dialog',
  templateUrl: './edit-task-project-dialog.component.html',
  styleUrls: ['./edit-task-project-dialog.component.scss']
})
export class EditTaskProjectDialogComponent implements OnInit {
  isSharedProjects: string = '0';
  taskDeadline: Date = new Date();
  tags: Set<string> = new Set<string>();
  members: UserModel[] = [];
  options: UserModel[] = [];

  @ViewChild(NbTagInputDirective, { read: ElementRef })
  tagInput!: ElementRef<HTMLInputElement>;
  
  constructor(public projectPropService: ProjectPropService) { }

  ngOnInit(): void {
  }

  filterProjects(event: any) {
    console.log(event);
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
  }

  onTagAdd(value: UserModel): void {
    if (value) {
      this.tags.add(value.displayName);
      console.log(this.tags);
      this.members.push(value);
      this.options = this.options.filter((o) => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

}
