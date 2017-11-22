import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule,
  MatDialogModule,MatDialogConfig,MatFormFieldModule,
  MatInputModule,MatSelectModule,MatListModule,MatExpansionModule,
  MatToolbarModule,MatAutocompleteModule,MatChipsModule,MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [    
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
