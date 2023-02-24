import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByLabelTaskComponent } from './by-label-task.component';

describe('ByLabelTaskComponent', () => {
  let component: ByLabelTaskComponent;
  let fixture: ComponentFixture<ByLabelTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByLabelTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByLabelTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
