import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LayoutModule } from '@angular/cdk/layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';

const MaterialComponents = [
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatTreeModule,
  MatTooltipModule,
  MatExpansionModule,
  MatTableModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatGridListModule,
  MatAutocompleteModule,
  LayoutModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatSortModule,
  MatRippleModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
