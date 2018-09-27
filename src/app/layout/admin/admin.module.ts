import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertModule, PaginationModule, BsDropdownModule, ModalModule } from "ngx-bootstrap";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      AdminRoutingModule,
      AlertModule.forRoot(),
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      SharedModule
  ],
  declarations: [
      AdminComponent
  ]
})
export class AdminModule {}