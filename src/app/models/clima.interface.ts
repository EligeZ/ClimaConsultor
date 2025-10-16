export interface Clima {
  temperatura: number | null;
  descricao: string | null;      
  umidade?: number | null;       
  vento?: {
    velocidade: number | null;   
    direcao?: number | null;     
  } | undefined;
  time?: string | null;          
}
