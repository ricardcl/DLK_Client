import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBddComponent } from './page-bdd.component';

describe('PageBddComponent', () => {
  let component: PageBddComponent;
  let fixture: ComponentFixture<PageBddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
