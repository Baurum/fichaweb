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
      console.log(response);
    }, err => {
      console.log('Oooops something wrong');
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
  private submitStartDate(): void {
    const startTimeHour = new Date().getHours().toString();
    const startTimeMinutes = new Date().getMinutes().toString();
    const body = {
      startDate: this.getToday(),
      endDate: this.getToday(),
      entryTime: startTimeHour + ':' + startTimeMinutes,
    };
    console.log(body);
    // Create a time registry for current user
    this.http.post(environment.API_URL + 'time-registries/', body, this.httpOptionsAuthToken)
      .subscribe((response) => {
        console.log(response);
        console.log('Successful time registry created');
      }, err => {
        console.log('Oooops something wrong');
      });
  }

  /**
   * Exit time request.
   * This request update the last created time registry.
   */
  public submitEndDate(): void {
    const endTime = new Date().getHours().toString();
    const endTimeMinutes = new Date().getMinutes().toString();
    const body = {
      startDate: this.getToday(),
      endDate: this.getToday(),
      exitTime: endTime + ':' + endTimeMinutes
    };
    console.log(body);
    // Updates the las time registry for current user.
    this.http.patch(environment.API_URL + 'time-registries/', body, this.httpOptionsAuthToken)
      .subscribe((response) => {
        console.log(response);
        console.log('Successful time registry updated');
      }, err => {
        console.log('Oooops something wrong');
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

  // /**
  //  * Request to create new registry in the server.
  //  * TODO: For future implementation.
  //  */
  // public submit() {
  //   let token = '';
  //   const body = {
  //     startDate: '2019-10-10',
  //     endDate: '2019-10-10',
  //     entryTime: '08:30',
  //     exitTime: '14:30'
  //   };
  //   this.http.post(environment.API_URL + '/time-registries/', body, this.httpOptionsAuthToken)
  //     .subscribe((response) => {
  //       console.log(response);
  //       console.log('Successful user create');
  //       this.router.navigate(['/time_registry']);
  //     }, err => {
  //       console.log('Oooops something wrong');
  //     });
  // }
}
