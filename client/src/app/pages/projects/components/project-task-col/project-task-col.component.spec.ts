import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskColComponent } from './project-task-col.component';

describe('ProjectTaskColComponent', () => {
  let component: ProjectTaskColComponent;
  let fixture: ComponentFixture<ProjectTaskColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTaskColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
