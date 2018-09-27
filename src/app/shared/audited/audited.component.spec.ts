import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditedComponent } from './audited.component';

describe('AuditedComponent', () => {
  let component: AuditedComponent;
  let fixture: ComponentFixture<AuditedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
