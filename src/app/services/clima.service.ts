import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clima } from '../models/clima.interface';
import { WEATHER_CODE_MAP } from '../utils/weather-codes';


@Injectable({ providedIn: 'root' })
export class ClimaService {
  private base = environment.BASE_URL_Clima; 

  constructor(private http: HttpClient) {}

  getClimaPorCoords(lat: number, lng: number): Observable<Clima> {
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      throw new Error('Coordenadas inválidas');
    }

    const params = new HttpParams()
      .set('latitude', String(lat))
      .set('longitude', String(lng))
      .set('current_weather', 'true')
      .set('hourly', 'relativehumidity_2m') 
      .set('timezone', 'auto'); 

    return this.http.get<any>(this.base, { params }).pipe(
      map(res => {
        const cw = res?.current_weather;
        const times: string[] = res?.hourly?.time ?? [];
        const rh: (number | null)[] = res?.hourly?.relativehumidity_2m ?? [];

        let umidade: number | null = null;
        if (cw && times.length && rh.length) {
          const idxExact = times.indexOf(cw.time);
          if (idxExact !== -1) {
            umidade = Number(rh[idxExact]);
          } else {
            const target = Date.parse(cw.time);
            let bestIdx = -1;
            let bestDiff = Infinity;
            for (let i = 0; i < times.length; i++) {
              const t = Date.parse(times[i]);
              const diff = Math.abs(t - target);
              if (diff < bestDiff) {
                bestDiff = diff;
                bestIdx = i;
              }
            }
            if (bestIdx !== -1) umidade = Number(rh[bestIdx]);
          }
        }

        const weathercode: number | undefined = cw?.weathercode;
        const descricao = (weathercode != null) ? (WEATHER_CODE_MAP[weathercode] ?? `Código ${weathercode}`) : null;

        return {
          temperatura: cw?.temperature ?? null,
          descricao,
          umidade: Number.isNaN(Number(umidade)) ? null : umidade,
          vento: cw ? { velocidade: cw.windspeed ?? null, direcao: cw.winddirection ?? null } : undefined,
          time: cw?.time ?? null
        } as Clima;
      })
    );
  }
}
