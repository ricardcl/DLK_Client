import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDividerModule, MatListModule, MatTabsModule, MatCheckboxModule,MatStepperModule,MatCardModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
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
import { PageDocumentationComponent } from './page-documentation/page-documentation.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageAccueilComponent,
    MenuComponent,
    PageDocumentationComponent   
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
    MatDatepickerModule,
    MatMomentDateModule,
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
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
