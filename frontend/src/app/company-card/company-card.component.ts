import { Component,Input } from '@angular/core';
import { Company } from '../models/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent {
  @Input() company: Company | undefined;
  constructor(private router: Router) {}

  navigateToCompany() {
    this.router.navigate(['/company', this.company?.id]);
  }
}
