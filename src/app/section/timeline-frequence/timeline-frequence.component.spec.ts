import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFrequenceComponent } from './timeline-frequence.component';

describe('TimelineFrequenceComponent', () => {
  let component: TimelineFrequenceComponent;
  let fixture: ComponentFixture<TimelineFrequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineFrequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFrequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
