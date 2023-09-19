import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchResultsComponent } from './employee-search-results.component';

describe('EmployeeSearchResultsComponent', () => {
  let component: EmployeeSearchResultsComponent;
  let fixture: ComponentFixture<EmployeeSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeSearchResultsComponent]
    });
    fixture = TestBed.createComponent(EmployeeSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
