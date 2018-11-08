import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { Zone1Component } from './zone1/zone1.component';
import { Zone2Component } from './zone2/zone2.component';
import { Zone3Component } from './zone3/zone3.component';
import { LocationComponent } from './location/location.component';
import { DetectionComponent } from './detection/detection.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'zone1', component: Zone1Component },
  { path: 'zone2', component: Zone2Component },
  { path: 'zone3', component: Zone3Component },
  { path: 'location', component: LocationComponent},
  { path: 'detection', component: DetectionComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
