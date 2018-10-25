import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog, MatSort, MatFormField, MatTooltip} from '@angular/material';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-zone2',
  templateUrl: './zone2.component.html',
  styleUrls: ['./zone2.component.scss']
})

export class Zone2Component implements OnInit {

  public dataTable = new MatTableDataSource([]);
  public selection = new SelectionModel(true, []);
  public displayedColumns = ['ID', 'temp', 'sound', 'light', 'humidity', 'door', 'chair'];
  public currentValues = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    const httpParams = new HttpParams().set('zone', 'zone2');
    this.http.post("http://photon.luges.net/getData.php", httpParams, {responseType: 'text'}).subscribe(data => { 
      this.dataTable = JSON.parse(data);
      this.currentValues = JSON.parse(data);
    });
  }
}
