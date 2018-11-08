import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog, MatSort, MatFormField, MatTooltip} from '@angular/material';
import {merge, of as observableOf, Observable, timer} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {

  public date = "11/08/2018";
  public time;
  public showTime;
  public objects;
  public activation;
  public displayedColumns = ['time', 'ID', 'oldZone', 'currentZone'];
  public currentValues;
  public devices = {A: {zone: "1"}, B: {zone: "1"}, C: {zone: "1"},
                    D: {zone: "3"}, E: {zone: "1"}, F: {zone: "1"},
                    G: {zone: "3"}, H: {zone: "1"}};
  public showHistory = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.setupDevices();
    merge(timer(0, 2000))
        .pipe(
          startWith({}),
          switchMap(() => {
            let httpParams = new HttpParams().set('zone', 'objects');
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
          switch(this.currentValues.deviceID) {
                case "A": this.devices.A.zone = this.currentValues.currentZone;
                break;
                case "B": this.devices.B.zone = this.currentValues.currentZone;
                break;
                case "C": this.devices.C.zone = this.currentValues.currentZone;
                break;
                case "D": this.devices.D.zone = this.currentValues.currentZone;
                break;
                case "E": this.devices.E.zone = this.currentValues.currentZone;
                break;
                case "F": this.devices.F.zone = this.currentValues.currentZone;
                break;
                case "G": this.devices.G.zone = this.currentValues.currentZone;
                break;
                case "H": this.devices.H.zone = this.currentValues.currentZone;
                break;
              }
        });
  }

  setupDevices(){
    let httpParams = new HttpParams().set('zone', 'objects');
    this.http.post("http://photon.luges.net/getData.php", httpParams, {responseType: 'text'}).subscribe((data) => {
      let i = JSON.parse(data).length-1;
      let a,b,c,d,e,f,g,h = false;
      while((!a || !b || !c || !d || !e || !f || !g || !h) && i >= 0) {
              switch(JSON.parse(data)[i].deviceID) {
                case "A": this.devices.A.zone = JSON.parse(data)[i].currentZone; a = true;
                break;
                case "B": this.devices.B.zone = JSON.parse(data)[i].currentZone; b = true;
                break;
                case "C": this.devices.C.zone = JSON.parse(data)[i].currentZone; c = true;
                break;
                case "D": this.devices.D.zone = JSON.parse(data)[i].currentZone; d = true;
                break;
                case "E": this.devices.E.zone = JSON.parse(data)[i].currentZone; e = true;
                break;
                case "F": this.devices.F.zone = JSON.parse(data)[i].currentZone; f = true;
                break;
                case "G": this.devices.G.zone = JSON.parse(data)[i].currentZone; g = true;
                break;
                case "H": this.devices.H.zone = JSON.parse(data)[i].currentZone; h = true;
                break;
              }
              i--;
            }
      console.log(this.devices);
    });
  }

  simulateHistory(){
    let httpParams = new HttpParams().set('zone', 'objects');
    console.log(this.date);
    console.log(this.time);
    this.date = "2018-11-08 12:00:23";
    const hourlyData  = [];
    this.http.post("http://photon.luges.net/getData.php", httpParams, {responseType: 'text'}).subscribe((data) => {
      for(let i = 0; i < JSON.parse(data).length; i++){
        const check_date = new Date(JSON.parse(data)[i].time);
        const input_date = new Date(this.date)
        const end_date = new Date( input_date.getFullYear(), input_date.getMonth(), input_date.getDate(), input_date.getHours()+1, input_date.getMinutes(), input_date.getSeconds());
        if(input_date < check_date && check_date < end_date){
          hourlyData.push(JSON.parse(data)[i])
        }
      }
      this.showHistory = true;
      const root = this;
      for(let j = 0; j < hourlyData.length; j++){
        setTimeout(function(j, devices, showTime) {
          root.showTime = hourlyData[j].time;;
          switch(hourlyData[j].deviceID) {
            case "A": devices.A.zone = hourlyData[j].currentZone;
            break;
            case "B": devices.B.zone = hourlyData[j].currentZone;
            break;
            case "C": devices.C.zone = hourlyData[j].currentZone;
            break;
            case "D": devices.D.zone = hourlyData[j].currentZone;
            break;
            case "E": devices.E.zone = hourlyData[j].currentZone;
            break;
            case "F": devices.F.zone = hourlyData[j].currentZone;
            break;
            case "G": devices.G.zone = hourlyData[j].currentZone;
            break;
            case "H": devices.H.zone = hourlyData[j].currentZone;
            break;
          }
          if(j == hourlyData.length - 1){
            root.showHistory = false;
          }
        }, j * 1000, j, this.devices, this.showTime)
      }
    })


  }
}
