import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingQueueComponent } from './routing-queue.component';

describe('RoutingQueueComponent', () => {
  let component: RoutingQueueComponent;
  let fixture: ComponentFixture<RoutingQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
