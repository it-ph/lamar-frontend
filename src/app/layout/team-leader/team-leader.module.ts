import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertModule, PaginationModule, BsDropdownModule, ModalModule } from "ngx-bootstrap";
import { TeamLeaderComponent } from "./team-leader.component";
import { TeamLeaderRoutingModule } from "./team-leader-routing-module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      TeamLeaderRoutingModule,
      AlertModule.forRoot(),
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      SharedModule
  ],
  declarations: [
    TeamLeaderComponent
  ]
})
export class TeamLeaderModule {}