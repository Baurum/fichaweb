import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {TimeRegistryModel} from '../models/responses/time-registry.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-time-registry',
  templateUrl: './time-registry.component.html',
  styleUrls: ['./time-registry.component.css']
})
export class TimeRegistryComponent implements OnInit {
  shouldDisplayRegistries: boolean;
  shouldDisplayAddRegistry: boolean;
  displayDate: string;
  timeRegistries: TimeRegistryModel[];

  httpOptionsAuthToken = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient, private router: Router, private calendar: NgbCalendar) {
  }

  ngOnInit() {
    this.displayDate = this.calendar.getToday().day.toString() + '/'
      + this.calendar.getToday().month.toString() + '/'
      + this.calendar.getToday().year.toString()
    ;
  }

  /**
   * Request all user registries and display in a table
   */
  public getUserRegistries(): void {
    this.shouldDisplayRegistries = !this.shouldDisplayRegistries;
    this.shouldDisplayAddRegistry = false;
    this.http.get<TimeRegistryModel[]>(environment.API_URL + 'time-registries/', this.httpOptionsAuthToken)
      .pipe(
        map(data => data.map(dataItem => {
            return new TimeRegistryModel(dataItem);
          })
        )
      ).subscribe((response) => {
      this.timeRegistries = response;
    }, err => {
      alert('Oooops something wrong');
    });

  }

  /**
   * Display form to add new registry.
   */
  public addRegistry(): void {
    this.shouldDisplayAddRegistry = !this.shouldDisplayAddRegistry;
    this.shouldDisplayRegistries = false;
  }

  /**
   * Entry time request.
   * This request create a time registry.
   */
  public submitStartDate(): void {
    const startTimeHour = new Date().getHours().toString();
    const currentStartDateMinutes = new Date().getMinutes();
    let startTimeMinutes = '';
    if (currentStartDateMinutes < 10) {
      startTimeMinutes = '0' +  new Date().getMinutes().toString();
    } else {
      startTimeMinutes = new Date().getMinutes().toString();
    }
    const body = {
      startDate: this.getToday(),
      endDate: this.getToday(),
      entryTime: startTimeHour + ':' + startTimeMinutes,
      exitTime: ''
    };
    // Create a time registry for current user
    this.http.post(environment.API_URL + 'time-registries/', body, this.httpOptionsAuthToken)
      .subscribe((response) => {
        alert('Successful time registry created');
      }, err => {
        alert('Oooops something wrong');
      });
  }

  /**
   * Exit time request.
   * This request update the last created time registry.
   */
  public submitEndDate(): void {
    const endTime = new Date().getHours().toString();
    const currentEndTimeMinutes = new Date().getMinutes();
    let endTimeMinutes = '';
    if (currentEndTimeMinutes < 10)  {
      endTimeMinutes = '0' +  currentEndTimeMinutes.toString();
    } else {
      endTimeMinutes = currentEndTimeMinutes.toString();
    }
    const body = {
      startDate: this.getToday(),
      endDate: this.getToday(),
      entryTime: '',
      exitTime: endTime + ':' + endTimeMinutes
    };
    // Updates the las time registry for current user.
    this.http.patch(environment.API_URL + 'time-registries/', body, this.httpOptionsAuthToken)
      .subscribe((response) => {
        alert('Successful time registry updated');
      }, err => {
        alert('Oooops something wrong');
      });
  }

  /**
   * Prettify date to send to server.
   */
  private getToday() {
    return this.calendar.getToday().year.toString() + '-'
      + this.calendar.getToday().month.toString() + '-'
      + this.calendar.getToday().day.toString();
  }
}
