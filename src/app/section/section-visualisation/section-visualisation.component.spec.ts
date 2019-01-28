import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionVisualisationComponent } from './section-visualisation.component';

describe('SectionVisualisationComponent', () => {
  let component: SectionVisualisationComponent;
  let fixture: ComponentFixture<SectionVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
