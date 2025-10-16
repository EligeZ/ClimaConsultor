// src/app/services/coordenada.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coordenada } from '../models/coordenada.interface';

@Injectable({ providedIn: 'root' })
export class CoordenadaService {
  private base = environment.BASE_URL_Coordenada; 
  private apiKey = environment.keyCoordenada;

  constructor(private http: HttpClient) {}

  enderecoParaCoordenadas(enderecoStr: string): Observable<Coordenada> {
    const url = `${this.base}?address=${encodeURIComponent(enderecoStr)}&key=${this.apiKey}`;

    return this.http.get<any>(url).pipe(

      tap(res => console.log('[Geocoding] response:', res)),

      map(res => {
        const googleFirst = res?.results?.[0];
        if (googleFirst && googleFirst.geometry?.location) {
          const lat = Number(googleFirst.geometry.location.lat);
          const lng = Number(googleFirst.geometry.location.lng);
          if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
            return { lat, lng } as Coordenada;
          }
        }

        throw new Error('Geocoding: nenhum resultado com coordenadas válidas para o endereço');
      })
    );
  }
}
