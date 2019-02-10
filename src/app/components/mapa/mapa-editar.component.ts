import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styles: []
})
export class MapaEditarComponent implements OnInit {

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<MapaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = fb.group({
        'title': data.title,
        'desc': data.desc
      });
  }

  ngOnInit() {
  }


  guardarCambios() {
    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
