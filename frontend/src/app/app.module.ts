import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CompanyCardComponent } from './company-card/company-card.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeFileComponent } from './employee-file/employee-file.component';
import { CompanyFileComponent } from './company-file/company-file.component';

const routes: Routes = [
  { path: 'companies', component: CompanyListComponent },
  { path: 'employees', component: EmployeeSearchComponent },
  { path: 'add-company', component: CompanyFormComponent },
  { path: 'add-company-file', component:CompanyFileComponent},
  { path: 'company/:id', component: CompanyDetailsComponent },
  { path: 'company/:id/newEmployee', component: EmployeeFormComponent },
  { path: '', redirectTo: '/add-company', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyFormComponent,
    CompanyListComponent,
    EmployeeListComponent,
    CompanyCardComponent,
    EmployeeCardComponent,
    CompanyDetailsComponent,
    EmployeeSearchComponent,
    EmployeeFormComponent,
    EmployeeFileComponent,
    CompanyFileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
