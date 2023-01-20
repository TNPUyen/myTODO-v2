import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoDialogComponent } from './project-info-dialog.component';

describe('ProjectInfoDialogComponent', () => {
  let component: ProjectInfoDialogComponent;
  let fixture: ComponentFixture<ProjectInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
