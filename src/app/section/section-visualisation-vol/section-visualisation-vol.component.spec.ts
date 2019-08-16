import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionVisualisationVolComponent } from './section-visualisation-vol.component';

describe('SectionVisualisationVolComponent', () => {
  let component: SectionVisualisationVolComponent;
  let fixture: ComponentFixture<SectionVisualisationVolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionVisualisationVolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionVisualisationVolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
