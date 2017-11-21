import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule,
  MatDialogModule,MatDialogConfig,MatFormFieldModule,
  MatInputModule,MatSelectModule,MatListModule,MatExpansionModule,
  MatToolbarModule,MatAutocompleteModule,MatChipsModule
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
    MatToolbarModule
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
    MatToolbarModule
  ],
  declarations: [],
  providers:[MatDialogConfig]
})
export class CustomMaterialModule { }
