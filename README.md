# Teste técnico - Irriga Global

## Requesitos:
- NodeJS
- Mysql
- Yarn
---
## Como rodar o projeto:

- 1º - Clone o projeto do Github em uma pasta em seu computador.
- 2º - Acesse a pasta do projeto e abra um terminal.
- 3º - Execute o comando para instalar as dependências o projeto.
~~~
yarn
~~~
- 4º - Configure um banco MYSQL.
  - Crie o banco de dados.
  - Execute as criações das tabelas no banco.
  - Execute a inserção das cidades.
  - Os scripts para o banco encontran-se mais a baixo.
- 5º - Configure o arquivo .env utiizando o modelo .env.example inserindo as informações do banco de dados criado 
- 6º - Execute alguns dos comandos a seguir:

Para executar a aplicação como desenvolvedor:
```
yarn dev
```
Para executar a aplicação como produção:
```
yarn start
```
Para executar os testes na aplicação:
```
yarn test
```
Para fazer a busca de tempo para todas as cidades:
```
yarn run:weather
```
Para fazer a busca para uma cidade em especifico:
```
yarn run:weather {id}
```
---
## Como funciona?

Este projeto ao ser executada com os comandos `yarn dev` ou `yarn start` irá executar uma rotina que de tempos em tempo faz requisições a api do OpenWeather e buscar dados de clima/tempo para um conjunto de cidades cadastradas no banco de dados e os salva em um banco local. Já os comandos `yarn run:weather` ou `yarn run:weather {id da cidade}` iram fazer esta rotina de forma manual sendo o primeiro comando faz a busca para todas cidades cadastradas no BD e o segundo comando serve para fazer uma busca especifica para uma cidade, o comando `yarn test` faz rodar os testes implementados no projeto.
Ao rodar os comandos `yarn dev` ou `yarn start` também podemos fazer requisições estilo API utlizando-se de rotas implementadas no projeto:
- Rota GET para listar todas as cidades cadastradas:
  - http://localhost:3333/cities
- Rota GET para fazer a busca e salvar todos os tempos para todas as cidades, retornando apenas status 201.
  - http://localhost:3333/weather
- Rota GET para fazer a busca para uma cidade especifica e salva no BD, retornando Status 201 e as informações obtidas para aquela cidade
  - http://localhost:3333/weather/1

---
## DATABASE
- Caso queira criar e executar as migrations e seeds via terminal com base na config do sequelize use o comando:
```
yarn sequelize db:create && yarn sequelize db:migrate && yarn sequelize db:seed:all
```
- Create Database:
```sql
create database IRRIGA;
```
- Use database criado
```sql
USE IRRIGA;
```
- Create Cities Table:
```sql
CREATE TABLE cities (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(100) NOT NULL,
	latitude VARCHAR(50),
	longitude VARCHAR(50),
	gmt INT NOT NULL
);
```
- Add cities
```sql
INSERT INTO cities (name, latitude, longitude, gmt) VALUES ('Santa Maria', '-29.6841666667', '-53.8069444444', -3);
INSERT INTO cities (name, latitude, longitude, gmt) VALUES ('Campo Grande', '-20.4427777778', '-54.6463888889', -4);
INSERT INTO cities (name, latitude, longitude, gmt) VALUES ('Deutsch Jahrndorf', '48.0086111111', '17.1097222222', 2);
INSERT INTO cities (name, latitude, longitude, gmt) VALUES ('Três de Maio', NULL, NULL, -3);
```
- Add Weather Table:
```sql
CREATE TABLE weather (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    city_id int,
	temp DOUBLE,
    temp_max DOUBLE,
    temp_min DOUBLE,
    wind_speed DOUBLE,
    sunrise time,
    sunset time,
    rain DOUBLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY FK_City (city_id) REFERENCES cities(id) ON UPDATE CASCADE ON DELETE CASCADE
);
```
---
## Problemas encontrados
- Quando não temos a latitude e longitude de uma cidade:
  - Solução foi fazer uma buscar na propria api pelo nome da cidade e retornando a primeira da busca, porem esta solução pode conter falhas para cidades com mesmo nome, mas de localidades diferentes isso fará que talvez retorne valores de uma cidade não adequadas
---
