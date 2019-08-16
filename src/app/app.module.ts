import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDividerModule, MatListModule, MatTabsModule, MatCheckboxModule,MatStepperModule,MatCardModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MenuComponent } from './menu/menu.component'; 
import {MatIconModule} from '@angular/material/icon'; 
import { SectionModule } from './section/section.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageAccueilComponent,
    MenuComponent   
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
    MatStepperModule,
    MatCardModule,
    VerticalTimelineModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    AppRoutingModule,
    SectionModule,
    NavbarModule,
    FooterModule,
    HeaderModule,
    MatExpansionModule,
    MatTabsModule, 
    MatCheckboxModule, 
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
