import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SummaryTableComponent, TableComponent } from 'src/app/components';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TableComponent,
    AutocompleteLibModule,
    SummaryTableComponent,
    MatDialogModule
  ]
})
export class HomeModule { }
