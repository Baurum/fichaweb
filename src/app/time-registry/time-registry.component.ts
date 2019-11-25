import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-time-registry',
  templateUrl: './time-registry.component.html',
  styleUrls: ['./time-registry.component.css']
})
export class TimeRegistryComponent implements OnInit {
  shouldDisplayRegistries: boolean;
  shouldDisplayAddRegistry: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
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
}
