import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-registry',
  templateUrl: './time-registry.component.html',
  styleUrls: ['./time-registry.component.css']
})
export class TimeRegistryComponent implements OnInit {
  shouldDisplayRegistries: boolean;
  shouldDisplayAddRegistry: boolean;
  displayDate: string;

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
    let token = '';
    this.http.get(environment.API_URL + 'time-registries/')
      .subscribe((response) => {
        console.log(response);
        console.log('Successful user create');
        this.router.navigate(['/time_registry']);
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
   * Request to create new registry in the server.
   * TODO: For future implementation.
   */
  public submit() {
    let token = '';
    const body = {
      startDate: '2019-10-10',
      endDate: '2019-10-10',
      entryTime: '08:30',
      exitTime: '14:30'
    };
    this.http.post(environment.API_URL + '/time-registries/', body)
      .subscribe((response) => {
        console.log(response);
        console.log('Successful user create');
        this.router.navigate(['/time_registry']);
      }, err => {
        console.log('Oooops something wrong');
      });
  }

  /**
   * Entry time request.
   * This request create a time registry.
   */
  private submitStartDate(): void {
    let token = '';
    const startTimeHour = new Date().getHours().toString();
    const startTimeMinutes = new Date().getMinutes().toString();
    const body = {
      startDate: this.getToday(),
      endDate: this.getToday(),
      entryTime: startTimeHour + ':' + startTimeMinutes,
    };
    console.log(body);
    // Create a time registry for current user
    this.http.post(environment.API_URL + '/time-registries/', body)
      .subscribe((response) => {
        console.log(response);
        console.log('Successful user create');
      }, err => {
        console.log('Oooops something wrong');
      });
  }

  /**
   * Exit time request.
   * This request update the last created time registry.
   */
  public submitEndDate(): void {
    let token = '';
    const endTime = new Date().getHours().toString();
    const endTimeMinutes = new Date().getMinutes().toString();
    const body = {
      startDate: this.getToday(),
      endDate: this.getToday(),
      exitTime: endTime + ':' + endTimeMinutes
    };
    console.log(body);
    // Updates the las time registry for current user.
    this.http.patch(environment.API_URL + '/time-registries/id', body)
      .subscribe((response) => {
        console.log(response);
        console.log('Successful user create');
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
}
