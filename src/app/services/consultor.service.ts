// src/app/services/consultor.service.ts
import { Injectable } from '@angular/core';
import { EnderecoService } from './endereco.service';
import { CoordenadaService } from './coordenada.service';
import { ClimaService } from './clima.service';
import { Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Endereco } from '../models/endereco.interface';
import { Coordenada } from '../models/coordenada.interface';
import { Clima } from '../models/clima.interface';

@Injectable({ providedIn: 'root' })
export class ConsultorService {

  constructor(
    private enderecoSvc: EnderecoService,
    private geoSvc: CoordenadaService,
    private climaSvc: ClimaService
  ) {}

  getClimaPorCep(cep: string): Observable<{ endereco: Endereco; coords: Coordenada; clima: Clima }> {
    return this.enderecoSvc.getEnderecoPorCep(cep).pipe(
      switchMap(endereco => {
        const enderecoFormatado = `${endereco.logradouro || ''}, ${endereco.bairro || ''}, ${endereco.localidade} - ${endereco.uf}`;
        return this.geoSvc.enderecoParaCoordenadas(enderecoFormatado).pipe(
          switchMap(coords => {
            const lat = Number(coords.lat);
            const lng = Number(coords.lng);
            if (Number.isNaN(lat) || Number.isNaN(lng)) {
              return throwError(() => new Error('Coordenadas inválidas'));
            }
            return this.climaSvc.getClimaPorCoords(lat, lng).pipe(
              map(clima => ({ endereco, coords: { lat, lng }, clima }))
            );
          })
        );
      }),
      catchError(err => throwError(() => err))
    );
  }

  getClimaPorCidade(cidade: string): Observable<{ coords: Coordenada; clima: Clima }> {
    return this.geoSvc.enderecoParaCoordenadas(cidade).pipe(
      switchMap(coords => {
        const lat = Number(coords.lat);
        const lng = Number(coords.lng);
        if (Number.isNaN(lat) || Number.isNaN(lng)) {
          return throwError(() => new Error('Coordenadas inválidas'));
        }
        return this.climaSvc.getClimaPorCoords(lat, lng).pipe(
          map(clima => ({ coords: { lat, lng }, clima }))
        );
      }),
      catchError(err => throwError(() => err))
    );
  }
}
