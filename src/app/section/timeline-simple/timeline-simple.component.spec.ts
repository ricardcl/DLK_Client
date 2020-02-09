import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSimpleComponent } from './timeline-simple.component';

describe('TimelineSimpleComponent', () => {
  let component: TimelineSimpleComponent;
  let fixture: ComponentFixture<TimelineSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
