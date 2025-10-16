import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endereco } from '../models/endereco.interface';

@Injectable({ providedIn: 'root' })
export class EnderecoService {
  private base = environment.BASE_URL_Endereco;

  constructor(private http: HttpClient) {}

  getEnderecoPorCep(cep: string): Observable<Endereco> {
    const clean = cep.replace(/\D/g, '');
    return this.http.get<Endereco>(`${this.base}${clean}/json/`);
  }
}