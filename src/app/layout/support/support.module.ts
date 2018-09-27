import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SupportRoutingModule } from "./support-routing.module";
import { AlertModule, PaginationModule, BsDropdownModule, ModalModule } from "ngx-bootstrap";
import { SupportComponent } from "./support.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      SupportRoutingModule,
      AlertModule.forRoot(),
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      SharedModule
  ],
  declarations: [
      SupportComponent
  ]
})
export class SupportModule {}