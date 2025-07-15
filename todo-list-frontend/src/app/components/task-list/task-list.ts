import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskService, TaskItem } from '../../services/task.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'priority', 'status', 'actions'];
  tasks: TaskItem[] = [];

  private routerSub?: Subscription;


  dialog = inject(MatDialog);
  constructor(private taskService: TaskService, private router: Router) {}
  goToNew() {
    this.router.navigate(['/nueva']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/editar', id]);
  }


  ngOnInit() {
    this.loadTasks();
    // Recargar tareas cada vez que se navega a esta ruta
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url === '/') {
        this.loadTasks();
      }
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id: string) {
    if (!id) return;
    const dialogRef = this.dialog.open(ConfirmDeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") {
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.router.navigate(['/'], { replaceUrl: true }).then(() => {
              window.location.reload();
            });
          },
          error: () => {
            // Opcional: mostrar error al usuario
          }
        });
      }
    });
  }

}

@Component({
  selector: 'confirm-delete-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>¿Eliminar tarea?</h2>
    <mat-dialog-content>Esta acción no se puede deshacer.</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">Cancelar</button>
      <button mat-raised-button color="warn" mat-dialog-close="true">Eliminar</button>
    </mat-dialog-actions>
  `,
  imports: [MatButtonModule, MatDialogModule]
})
export class ConfirmDeleteDialog {}
