import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFileComponent } from './employee-file.component';

describe('EmployeeFileComponent', () => {
  let component: EmployeeFileComponent;
  let fixture: ComponentFixture<EmployeeFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeFileComponent]
    });
    fixture = TestBed.createComponent(EmployeeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
