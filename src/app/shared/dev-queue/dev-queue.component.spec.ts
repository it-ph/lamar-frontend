import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevQueueComponent } from './dev-queue.component';

describe('DevQueueComponent', () => {
  let component: DevQueueComponent;
  let fixture: ComponentFixture<DevQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
