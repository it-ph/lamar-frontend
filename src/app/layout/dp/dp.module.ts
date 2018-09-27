import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertModule, PaginationModule, BsDropdownModule, ModalModule } from "ngx-bootstrap";
import { DpComponent } from "./dp.component";
import { DpRoutingModule } from "./dp-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      DpRoutingModule,
      AlertModule.forRoot(),
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      SharedModule
  ],
  declarations: [
      DpComponent
  ]
})
export class DPModule {}