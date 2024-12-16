# Projeto G4F Backend

## Descrição
API desenvolvida utilizando NestJS para gerenciar notícias (CRUD) e realizar consultas de CEP por meio da integração com a API do ViaCEP.


## Estrutura de pastas e arquivos

   - A estrutura do projeto é organizada por módulos, que facilita a manutenção e desenvolvimento da aplicação.
   - Esse padrão permite a adição de novos módulos sem impacto em módulos existentes.
   - As integrações com APIs externas são isoladas na pasta integrations
   - Cada módulo é isolado em sua própria pasta, com subpastas específicas para:
      - controllers: Lida com as requisições HTTP.
      - entities e Dtos: Estruturas de dados e objetos de transferência.
      - services: Contém a lógica de negócio.
      - guards: Para segurança e controle de acesso.
   - Cada método de controller é definido em um arquivo isolado, garantindo clareza e responsabilidade única.
   - A pasta test organiza os testes end-to-end (E2E), seguindo o mesmo padrão modular dos arquivos de código-fonte.


## Tecnologias Principais
- **NestJS**: Framework para construir aplicações escaláveis e eficientes em Node.js.
- **Docker**: Para criar contêineres e facilitar a execução em diferentes ambientes.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **Swagger**: Para documentação e teste interativo dos endpoints da API.

---

## Configuração e Execução

### Pré-requisitos
1. **Node.js** instalado (versão 18 ou superior).
2. **NPM** (ou Yarn) para gerenciar dependências.
3. **Docker** (opcional, caso queira executar via contêiner).

---

### Passos para configurar e rodar localmente

1. Clone este repositório:

   git clone - [Backend G4F](https://github.com/fguilherme12/backend-g4f)
   cd projeto-g4f

2. Instale as dependências:

   npm install

3. Inicie a aplicação:

   npm run start

4. Acesse a aplicação em:
   http://localhost:3000

5. Documentação da API (Swagger):
   http://localhost:3000/api

---

### Executando a aplicação com Docker

1. **Crie o contêiner Docker**:

   docker build -t projeto-g4f .

2. **Inicie o contêiner**:

   docker run -p 3000:3000 projeto-g4f

3. A aplicação estará disponível em:
   http://localhost:3000

4. Documentação da API (Swagger):
   http://localhost:3000/api

---

## Testes Automatizados

Este projeto utiliza o framework **Jest** para executar testes de integração (e2e).

1. Para rodar todos os testes:

   npm run test

2. Para rodar testes de integração (e2e):

   npm run test:e2e


## Endpoints Disponíveis

1. **CRUD de Notícias**:
   - **GET /news**: Lista todas as notícias.
   - **GET /news/:id**: Retorna uma notícia específica.
   - **POST /news**: Cria uma nova notícia.
   - **PUT /news/:id**: Atualiza uma notícia existente.
   - **DELETE /news/:id**: Exclui uma notícia.

2. **Consulta de CEP**:
   - **GET /cep/:cep**: Consulta informações de um CEP utilizando a API ViaCEP.

---
