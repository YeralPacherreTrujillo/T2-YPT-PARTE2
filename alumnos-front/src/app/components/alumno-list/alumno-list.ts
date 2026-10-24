import { Component, OnInit, signal } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  templateUrl: './alumno-list.html',
  styleUrl: './alumno-list.scss'
})
export class AlumnoList implements OnInit {

  alumnos = signal<Alumno[]>([]);
  cargando = signal(false);
  error = signal('');

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.cargando.set(true);
    this.error.set('');

    this.alumnoService.listar().subscribe({
      next: datos => {
        this.alumnos.set(datos);
        this.cargando.set(false);
      },
      error: err => {
        this.error.set(`No se pudo conectar con la API. Error HTTP: ${err.status}`);
        this.cargando.set(false);
      }
    });
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    if (!confirm('¿Desea eliminar este alumno?')) return;

    this.alumnoService.eliminar(id).subscribe({
      next: () => this.alumnos.update(lista => lista.filter(a => a.id !== id)),
      error: err => this.error.set(`Error al eliminar. Error HTTP: ${err.status}`)
    });
  }
}