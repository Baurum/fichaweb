import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRegistryComponent } from './time-registry.component';

describe('TimeRegistryComponent', () => {
  let component: TimeRegistryComponent;
  let fixture: ComponentFixture<TimeRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
