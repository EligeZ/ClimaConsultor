# ClimaConsultor

Aplicação que busca informações meteorológicas a partir de CEP ou nome de cidade, exibindo previsões e dados de clima com interface amigável.

---

## 🧭 Sumário

- [Visão Geral](#visão-geral)
- [APIs utilizadas e links de documentação](#apis-utilizadas-e-links-de-documentação)
- [Como rodar o projeto localmente](#como-rodar-o-projeto-localmente)
- [Suposições feitas](#suposições-feitas)
- [Possíveis melhorias](#possíveis-melhorias)
- [Licença](#licença)

---

## Visão Geral

Este projeto tem como objetivo permitir que o usuário consulte o clima atual e previsões meteorológicas ao informar um CEP ou nome de cidade. Ele foi desenvolvido com **Ionic / Angular / TypeScript** (ou conforme seu stack, adapte) e consome APIs externas para obter os dados do tempo.

---

## APIs utilizadas e links de documentação

ViaCEP - https://viacep.com.br
Geocoding API - https://developers.google.com/maps/documentation/geocoding/overview (Necessita Chave)
Open-Meteo API - https://open-meteo.com

---

## Como rodar o projeto localmente

Abaixo um passo a passo geral (adapte conforme seu setup, scripts e dependências).

### Pré-requisitos

- Node.js
- npm
- Ionic CLI / Angular CLI (se for o caso)
- Chave(s) de API válida(s) para as APIs de clima que você usa

### Passos

1. Clone este repositório:

   ```bash
   git clone https://github.com/EligeZ/ClimaConsultor.git
   cd ClimaConsultor
   ```

2. Instale as dependências:

   ```bash
   npm install

   ```

3. Configure variáveis de ambiente ou arquivo de configuração:

   No arquivo `environment.ts` e `environment.prod.ts`:

   ```
   Substitua pela sua chave API

   -keyCoordenada:'Cole_Sua_Chave_Aqui'-

   ```

4. Execute em modo de desenvolvimento:

   ```bash

   ionic serve
   ```

5. Acesse no navegador a URL mostrada no terminal (por exemplo, `http://localhost:8100` ou `http://localhost:4200`).

6. Para build de produção / deploy:

   ```bash
   npm run build
   # ou
   ionic build --prod
   ```

---

## Suposições feitas

Durante o desenvolvimento do ClimaConsultor, foram feitas algumas suposições — é importante documentá-las para evitar surpresas:

- As temperaturas são fornecidas e exibidas em **graus Celsius** (°C).
- O fuso horário considerado é aquele da localização consultada, ou ajuste local do browser/dispositivo.
- Os dados retornados pelas APIs são considerados corretos e responsivos (tratamento de erros deve cobrir falhas).
- Campos como vento, umidade, pressão atmosférica, etc., podem não estar presentes em todas as respostas da API — é preciso tratar casos ausentes.
- A interface (UI) supõe largura mínima compatível com dispositivos móveis, sem layout complexo para telas muito grandes (desktop) — pode haver limitação visual em telas muito grandes.

---

## Possíveis melhorias

Aqui vão sugestões de melhorias que podem evoluir o projeto:

1. **Cache de dados / armazenamento local**  
   Armazenar localmente as últimas consultas, para exibir mesmo sem conexão ou reduzir chamadas à API.

2. **Internacionalização (i18n)**  
   Permitir suporte a múltiplos idiomas — ex: inglês, espanhol etc.

3. **Suporte a mais unidades**  
   Possibilitar alternância entre Celsius e Fahrenheit.

4. **Melhor tratamento de erros**  
   Exibir mensagens amigáveis ao usuário em caso de falha de rede, limite de API ou CEP/cidade inválido.

5. **Notificações / alertas climáticos**  
   Enviar notificações push em casos de previsão de tempo severo (se a API permitir esse tipo de alerta).

6. **Design mais responsivo para desktop / tablet**  
   Ajustar layout para melhor aproveitamento em telas grandes.

7. **Testes automatizados**  
   Adicionar testes unitários, de integração e end-to-end para garantir qualidade.

8. **Monitoramento de uso da API e fallback**  
   Se uma API externa falhar ou atingir limite, usar API de backup automaticamente.

9. **Documentação de API interna / componentes**  
   Se partes do sistema tiverem endpoints próprios (backend) ou componentes reutilizáveis, documentá-los e tipá-los bem.

10. **Deploy contínuo / pipeline CI/CD**  
    Automatizar builds, testes e deploys para ambientes de staging e produção.

---

## 🧑‍💻 Autor

| [EligeZ](https://github.com/EligeZ) |
