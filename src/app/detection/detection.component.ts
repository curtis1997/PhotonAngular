import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog, MatSort, MatFormField, MatTooltip} from '@angular/material';
import {merge, of as observableOf, timer} from 'rxjs';
import {catchError, map, startWith, switchMap, tap,} from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.scss']
})

export class DetectionComponent implements OnInit {
  
  public objects;
  public activation;
  public displayedColumns = ['ID', 'temp', 'light', 'humidity'];
  public currentValues;
  public sound = false;
  public motion = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    merge(timer(0, 2000))
        .pipe(
          startWith({}),
          switchMap(() => {
            let httpParams = new HttpParams().set('zone', 'activation');
            return this.http.post("http://photon.luges.net/getData.php", httpParams, {responseType: 'text'});
          }),
          map(data => {
            return JSON.parse(data);
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => {
          this.sound = false;
          this.motion = false;
          if(this.currentValues && this.currentValues.time !== data[data.length-1].time){
            if(data[data.length-1].sound !== "0"){
              this.sound = true;
            } else {
              this.motion = true;
            }
          }
          this.currentValues = data[data.length-1];
        });
  }

}
