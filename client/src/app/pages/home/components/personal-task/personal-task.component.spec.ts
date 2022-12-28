import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTaskComponent } from './personal-task.component';

describe('PersonalTaskComponent', () => {
  let component: PersonalTaskComponent;
  let fixture: ComponentFixture<PersonalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
