import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchedComponent } from './dispatched.component';

describe('DispatchedComponent', () => {
  let component: DispatchedComponent;
  let fixture: ComponentFixture<DispatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
