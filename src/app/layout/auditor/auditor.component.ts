import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auditor',
  templateUrl: './auditor.component.html',
  styleUrls: ['./auditor.component.css']
})
export class AuditorComponent implements OnInit {
  isActive: boolean;
  constructor() { }

  ngOnInit() {
  }

  toggleSidebar(){}
}
