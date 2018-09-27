import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertModule, PaginationModule, BsDropdownModule, ModalModule } from "ngx-bootstrap";

import { SharedModule } from "../../shared/shared.module";
import { AuditorRoutingModule } from "./auditor-routing.module";
import { AuditorComponent } from "./auditor.component";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      AlertModule.forRoot(),
      AuditorRoutingModule,
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      SharedModule
  ],
  declarations: [
      AuditorComponent
  ]
})
export class AuditorModule {}