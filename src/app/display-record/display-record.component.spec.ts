import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRecordComponent } from './display-record.component';

describe('DisplayRecordComponent', () => {
  let component: DisplayRecordComponent;
  let fixture: ComponentFixture<DisplayRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayRecordComponent]
    });
    fixture = TestBed.createComponent(DisplayRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
