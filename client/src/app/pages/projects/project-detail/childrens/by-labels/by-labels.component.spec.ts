import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByLabelsComponent } from './by-labels.component';

describe('ByLabelsComponent', () => {
  let component: ByLabelsComponent;
  let fixture: ComponentFixture<ByLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
