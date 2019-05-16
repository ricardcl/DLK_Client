import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SectionModule } from './section/section.module';
import { NavbarModule } from './navbar/navbar.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { VerticalTimelineModule } from 'angular-vertical-timeline';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    VerticalTimelineModule,
    AppRoutingModule,
    SectionModule,
    NavbarModule,
    FooterModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
