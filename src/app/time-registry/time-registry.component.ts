import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-registry',
  templateUrl: './time-registry.component.html',
  styleUrls: ['./time-registry.component.css']
})
export class TimeRegistryComponent implements OnInit {
  shouldDisplayRegistries: boolean;
  shouldDisplayAddRegistry: boolean;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Request all user registries and display in a table
   */
  public getUserRegistries(): void {
    this.shouldDisplayRegistries = !this.shouldDisplayRegistries;
    this.shouldDisplayAddRegistry = false;

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

  }
}
