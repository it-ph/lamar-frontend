import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertModule, PaginationModule, BsDropdownModule, ModalModule } from "ngx-bootstrap";

import { QaComponent } from "./qa.component";
import { QARoutingModule } from "./qa-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      QARoutingModule,
      AlertModule.forRoot(),
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      SharedModule
  ],
  declarations: [
      QaComponent
  ]
})
export class QAModule {}