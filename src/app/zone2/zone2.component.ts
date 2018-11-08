import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog, MatSort, MatFormField, MatTooltip} from '@angular/material';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-zone2',
  templateUrl: './zone2.component.html',
  styleUrls: ['./zone2.component.scss']
})

export class Zone2Component implements OnInit {

  public dataTable = new MatTableDataSource([]);
  public objects;
  public activation;
  public displayedColumns = ['time', 'ID', 'temp', 'light', 'humidity'];
  public currentValues = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.dataTable.paginator = this.paginator;
    merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          startWith({}),
          switchMap(() => {
            let httpParams = new HttpParams().set('zone', 'zone2');
            return this.http.post("http://photon.luges.net/getData.php", httpParams, {responseType: 'text'});
          }),
          map(data => {
            return JSON.parse(data);
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => {
          this.currentValues = data[data.length-1];
          this.dataTable.data = data;
        });
  }

}
