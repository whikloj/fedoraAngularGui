import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayRecordComponent } from './display-record/display-record.component';
import { RecordActionsComponent } from './record-actions/record-actions.component';
import { HeaderComponent } from './header/header.component';
import { RecordViewComponent } from './record-view/record-view.component';
import { FedoraConfigComponent } from './fedora-config/fedora-config.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayRecordComponent,
    RecordActionsComponent,
    HeaderComponent,
    RecordViewComponent,
    FedoraConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
