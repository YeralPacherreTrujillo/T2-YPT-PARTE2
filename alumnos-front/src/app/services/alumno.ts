import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({ providedIn: 'root' })
export class AlumnoService {

  private readonly apiUrl =
    'https://psychic-yodel-97wrjvpqgjjqcxjv7-8080.app.github.dev/api/alumnos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}