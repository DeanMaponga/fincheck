import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFileComponent } from './company-file.component';

describe('CompanyFileComponent', () => {
  let component: CompanyFileComponent;
  let fixture: ComponentFixture<CompanyFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyFileComponent]
    });
    fixture = TestBed.createComponent(CompanyFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
