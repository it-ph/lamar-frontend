import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-team-leader',
  templateUrl: './team-leader.component.html',
  styleUrls: ['./team-leader.component.scss'],
  providers: [AccessService]
})
export class TeamLeaderComponent implements OnInit {
  isActive: boolean;

  constructor(private accessService: AccessService) { }

  ngOnInit() {
  }
  
  toggleSidebar(){
    
  }

  onLoggedOut(){
    this.accessService.logout();
  }
}
