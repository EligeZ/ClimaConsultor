// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { searchOutline, timeOutline } from 'ionicons/icons';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';

import { ConsultorService } from '../services/consultor.service';
import { Endereco } from '../models/endereco.interface';
import { Coordenada } from '../models/coordenada.interface';
import { Clima } from '../models/clima.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  ],
})
export class HomePage {
  modo: 'cep' | 'cidade' = 'cep';
  entrada = '';
  buscando = false;
  erroMsg?: string;

  resultado: {
    endereco?: Endereco;
    coords?: Coordenada;
    clima?: Clima;
  } | null = null;

  

  constructor(private consultor: ConsultorService) {
    addIcons({ 
      searchOutline, 
      timeOutline
    });
  }
  

  buscarPorCep() {
    this.erroMsg = undefined;
    const cepClean = this.entrada.replace(/\D/g, '');
    if (cepClean.length !== 8) {
      this.erroMsg = 'CEP inválido';
      return;
    }

    this.buscando = true;
    this.consultor.getClimaPorCep(cepClean).subscribe({
      next: (res) => {
        this.resultado = {
          endereco: res.endereco,
          coords: res.coords,
          clima: res.clima,
        };
        this.buscando = false;
      },
      error: (err) => {
        console.error(err);
        this.erroMsg = 'Erro ao buscar clima/cep';
        this.buscando = false;
      },
    });
  }

  buscarPorCidade() {
    this.erroMsg = undefined;
    if (!this.entrada.trim()) {
      this.erroMsg = 'Digite uma cidade válida';
      return;
    }

    this.buscando = true;
    this.consultor.getClimaPorCidade(this.entrada).subscribe({
      next: (res) => {
        this.resultado = {
          coords: res.coords,
          clima: res.clima,
        };
        this.buscando = false;
      },
      error: (err) => {
        console.error(err);
        this.erroMsg = 'Erro ao buscar clima/cidade';
        this.buscando = false;
      },
    });
  }

  formatarDataHora(timeStr?: string | null): string {
  if (!timeStr) return '—';
  try {
    const d = new Date(timeStr);
    return d.toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return timeStr;
  }
}

}
