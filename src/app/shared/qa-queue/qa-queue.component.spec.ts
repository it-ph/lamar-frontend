import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaQueueComponent } from './qa-queue.component';

describe('QaQueueComponent', () => {
  let component: QaQueueComponent;
  let fixture: ComponentFixture<QaQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
