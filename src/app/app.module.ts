import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule, MatPaginatorModule, MatDialogModule, MatSortModule,
   MatInputModule, MatFormFieldModule, MatTooltipModule, MatTableModule, MatCheckboxModule,
  MatCardModule, MatProgressBarModule, MatMenuModule, MatDividerModule, MatDatepickerModule,
  MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Zone1Component } from './zone1/zone1.component';
import { Zone2Component } from './zone2/zone2.component';
import { Zone3Component } from './zone3/zone3.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LocationComponent } from './location/location.component';
import { DetectionComponent } from './detection/detection.component';

@NgModule({
  declarations: [
    AppComponent,
    Zone1Component,
    Zone2Component,
    Zone3Component,
    HomeComponent,
    PageNotFoundComponent,
    LocationComponent,
    DetectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
