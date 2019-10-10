import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineLineaireComponent } from './timeline-lineaire.component';

describe('TimelineLineaireComponent', () => {
  let component: TimelineLineaireComponent;
  let fixture: ComponentFixture<TimelineLineaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineLineaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineLineaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
