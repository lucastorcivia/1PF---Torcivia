import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    name: 'Enzo',
    surname: 'Lopez',
    email: "enzol@gmail.com",
    dni: 34542504,
    carrera: 'Ingenieria',
    nota_1: 7,
    nota_2: 8,
    final: 4,
  },
  {
    id: 2,
    name: 'Juan',
    surname: 'Perez',
    email: "juanperez@gmail.com",
    dni: 342252134,
    carrera: 'Administracion',
    nota_1: 5,
    nota_2: 9,
    final: 7,
  },
  {
    id: 3,
    name: 'Sofia',
    surname: 'Martinez',
    email: "sofiamar@gmail.com",
    dni: 342467834,
    carrera: 'Enfermeria',
    nota_1: 7,
    nota_2: 9,
    final: 8,
  },
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[] = ELEMENT_DATA;

  public today = new Date();

  constructor(private matDialog: MatDialog) {
  }

  onCreateUser(): void {
    this.matDialog
      // ABRO EL MODAL
      .open(UserFormDialogComponent)
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (v) => {
          console.log(v)
          if (v) {
            // this.users.push()
            this.users = [
              ...this.users,
              {
                id: this.users.length + 1,
                name: v.name,
                surname: v.surname,
                email: v.email,
                dni: v.dni,
                carrera: v.carrera,
                nota_1: v.nota_1,
                nota_2: v.nota_2,
                final: v.final
              },
            ];
          }
        },
      });
  }

  onDeleteUser(userToDelete: User): void {
    if (confirm(`¿Está seguro de eliminar a ${userToDelete.name}?`)) {
      this.users = this.users.filter((u) => u.id !== userToDelete.id);
    }
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
    // ABRO EL MODAL
    .open(UserFormDialogComponent, {
      data: userToEdit
    })
    // Y DESPUES DE QUE CIERRE
    .afterClosed()
    // HAGO ESTO...
    .subscribe({
      next: (userUpdated) => {
        if (userUpdated) {
          this.users = this.users.map((user) => {
            return user.id === userToEdit.id
              ? { ...user, ...userUpdated } // VERDADERO
              : user // FALSO ;
          })
        }
      },
    });
  }
}

