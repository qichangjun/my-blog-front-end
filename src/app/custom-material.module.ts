import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule,
  MatDialogModule,MatDialogConfig,MatFormFieldModule,
  MatInputModule,MatSelectModule,MatListModule,MatExpansionModule,
  MatToolbarModule,MatAutocompleteModule,MatChipsModule,MatTabsModule,
  MatMenuModule,MatTooltipModule,MatCardModule,MatDatepickerModule,MatNativeDateModule
} from '@angular/material';
// import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
  imports: [    
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule
  ],
  exports:[
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule
  ],
  declarations: [],
  providers:[
    MatDialogConfig,
    
    {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'}
  ]
})
export class CustomMaterialModule { }
