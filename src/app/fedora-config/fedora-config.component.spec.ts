import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FedoraConfigComponent } from './fedora-config.component';

describe('FedoraConfigComponent', () => {
  let component: FedoraConfigComponent;
  let fixture: ComponentFixture<FedoraConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FedoraConfigComponent]
    });
    fixture = TestBed.createComponent(FedoraConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
