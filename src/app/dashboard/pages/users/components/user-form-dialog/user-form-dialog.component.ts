import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent {
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
  ]);
  dniControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8)
  ]);

  nota1Control = new FormControl<number | null>(null, [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(2)
  ]);

  nota2Control = new FormControl<number | null>(null, [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(2)
  ]);

  finalControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(2)
  ]);

  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required]);
  carreraControl = new FormControl<string | null>(null, [Validators.required]);
  
  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    dni: this.dniControl,
    carrera: this.carreraControl,
    nota_1: this.nota1Control,
    nota_2: this.nota2Control,
    final: this.finalControl
  });

  // userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {
    // this.userForm = this.formBuilder.group({
    //   name: [null, [Validators.required, Validators.min(2)]],
    //   surname: [null, [Validators.required]],
    // })
    console.log(data)
    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
      this.dniControl.setValue(this.data.dni);
      this.carreraControl.setValue(this.data.carrera);
      this.nota1Control.setValue(this.data.nota_1);
      this.nota2Control.setValue(this.data.nota_2);
      this.finalControl.setValue(this.data.final);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
