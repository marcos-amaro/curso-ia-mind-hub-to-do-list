import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, TaskItem } from '../../services/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnInit {
  form!: FormGroup;
  isEdit = false;
  taskId: string | null = null;

  priorities = [
    { value: 'Low', label: 'Baja' },
    { value: 'Medium', label: 'Media' },
    { value: 'High', label: 'Alta' }
  ];
  statuses = [
    { value: 'Pending', label: 'Pendiente' },
    { value: 'Completed', label: 'Completada' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [null],
      priority: ['Low', Validators.required],
      status: ['Pending', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
      if (this.taskId) {
        this.isEdit = true;
        this.taskService.getTasks().subscribe(tasks => {
          const task = tasks.find(t => t.id === this.taskId);
          if (task) {
            this.form.patchValue({
              ...task,
              dueDate: task.dueDate ? new Date(task.dueDate) : null
            });
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    const task: TaskItem = {
      ...value,
      dueDate: value.dueDate ? value.dueDate.toISOString().split('T')[0] : undefined
    };
    if (this.isEdit && this.taskId) {
      this.taskService.updateTask(this.taskId, task).subscribe(() => {
        this.router.navigate(['/'], { replaceUrl: true }).then(() => {
          window.location.reload();
        });
      });
    } else {
      this.taskService.createTask(task).subscribe(() => {
        this.router.navigate(['/'], { replaceUrl: true }).then(() => {
          window.location.reload();
        });
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
