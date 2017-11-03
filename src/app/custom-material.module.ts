import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule,
  MatDialogModule,MatDialogConfig,MatFormFieldModule,
  MatInputModule,MatSelectModule } from '@angular/material';

@NgModule({
  imports: [    
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  exports:[
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [],
  providers:[MatDialogConfig]
})
export class CustomMaterialModule { }
