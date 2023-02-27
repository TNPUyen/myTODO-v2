import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskProjectDialogComponent } from './edit-task-project-dialog.component';

describe('EditTaskProjectDialogComponent', () => {
  let component: EditTaskProjectDialogComponent;
  let fixture: ComponentFixture<EditTaskProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskProjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
