import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @Input() 
  queue: any;

  @Output()
  onApprove = new EventEmitter();

  @Output()
  onReject = new EventEmitter();

  @ViewChild('details')
  details: ModalDirective;

  @ViewChild('reject_modal')
  reject_modal: ModalDirective;

  selectedItem: any;

  constructor() { }

  ngOnInit() {
      console.log(this.queue);
  }

  viewDetails(ad){
    this.selectedItem = ad;
    this.details.show();

  }
  
  approve(ad){
    this.onApprove.emit(ad);
  }
  showRejectRemarksModal(ad){
    this.selectedItem = ad;
    this.reject_modal.show();
  }

}
