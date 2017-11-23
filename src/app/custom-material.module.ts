import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule,
  MatDialogModule,MatDialogConfig,MatFormFieldModule,
  MatInputModule,MatSelectModule,MatListModule,MatExpansionModule,
  MatToolbarModule,MatAutocompleteModule,MatChipsModule,MatTabsModule,
  MatMenuModule,MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [    
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
  providers:[MatDialogConfig]
})
export class CustomMaterialModule { }
