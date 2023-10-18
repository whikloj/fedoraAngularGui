import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordActionsComponent } from './record-actions.component';

describe('RecordActionsComponent', () => {
  let component: RecordActionsComponent;
  let fixture: ComponentFixture<RecordActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordActionsComponent]
    });
    fixture = TestBed.createComponent(RecordActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
