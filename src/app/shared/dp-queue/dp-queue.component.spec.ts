import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpQueueComponent } from './dp-queue.component';

describe('DpQueueComponent', () => {
  let component: DpQueueComponent;
  let fixture: ComponentFixture<DpQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
