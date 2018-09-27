import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertModule, PaginationModule, BsDropdownModule, ModalModule } from "ngx-bootstrap";

import { ArtistComponent } from "./artist.component";
import { ArtistRoutingModule } from "./artist-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      AlertModule.forRoot(),
      ArtistRoutingModule,
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      SharedModule
  ],
  declarations: [
      ArtistComponent
  ]
})
export class ArtistModule {}