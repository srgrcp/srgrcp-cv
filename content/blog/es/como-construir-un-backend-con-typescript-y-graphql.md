---
title: Como Construir Un Backend Con Typescript Y GraphQL
description: En este articulo aprenderemos a desarrollar un backend escalable con Typescript y GraphQL, automatizando la parte aburrida, con inyección de dependencias y migraciones automaticas.
slug: como-construir-un-backend-con-typescript-y-graphql
createdAt: 2022-02-18T14:51:16.016Z
image: /type-graphql.webp
tags:
  - typescript
  - graphql
  - backend
  - typeorm
---

## Introducción

El stack que vamos a utilizar es el siguiente:

* [Typescript](https://www.typescriptlang.org/)
* [GraphQL](https://graphql.org/)
* [Apollo  Server](https://www.apollographql.com/docs/apollo-server/)
* [TypeGraphQL](https://typegraphql.com/)
* [TypeOrm](https://typeorm.io/)
* [TypeDi](https://www.npmjs.com/package/typedi)
* [Class Validator](https://www.npmjs.com/package/class-validator)

En este articulo aprenderemos a desarrollar un backend escalable con Typescript y GraphQL, automatizando la parte aburrida, con inyección de dependencias y migraciones automaticas.

## Instalación

### Creación del proyecto

Para la creación del proyecto nos vamos ayudar con el cli de typeorm, con lo que obtendremos una estructura base para nuestro proyecto.

```bash
npx typeorm init --name backend-graphql --database mysql --docker
```

Con la opción `--database` definimos que base de datos vamos a utilizar, en este tutorial utilizaremos mysql.

La opción `--docker` nos genera automaticamente un docker-compose.yml con el servidor MySQL ya configurado, con esto nos evitamos instalar MySQL en nuestra maquina. Recomiendo instalar docker y docker-compose, los cuales vienen incluídos en [Docker Desktop](https://www.docker.com/products/docker-desktop).

### Dependencias

Procedemos a instalar las dependencias que vamos a necesitar.

```bash
# Yarn
yarn add apollo-server class-validator express graphql merge-graphql-schemas type-graphql typedi cors

# NPM
npm install --save apollo-server class-validator express graphql merge-graphql-schemas type-graphql typedi cors
```

Dependencias de desarrollo

```bash
# Yarn
yarn add -D @types/express

# NPM
npm install --save-dev @types/express
```

Ahora tenemos algo como:

```
src/
├── entity/
├── migrations/
└── index.ts
docker-compose.yml
ormconfig.json
package.json
tsconfig.json
```

## Configuración

El archivo `src/index.ts` es el punto de entrada de nuestro proyecto, en él establecerémos conección con la base de datos e iniciaremos nuestro servidor GraphQL.

Lo primero que harémos es eliminar el código que trae por defecto y crearémos un método asíncrono, el cual vamos a llamar inmediatamente:

```typescript
// src/index.ts
import "reflect-metadata";

async function main() {
  // Aquí nos conectaremos a la base de datos
  // e iniciamos nuestro servidor GraphQL
}

main();
```

### Conección con la base de datos

Para conectar el backend a la base de datos solo es necesario llamar al método `createConnection` de la librería `typeorm`, si desea cambiar las configuraciones de la base de datos puede hacerlo en el archivo `ormconfig.json`, siguiendo las [instrucciones de TypeOrm](https://typeorm.io/#/using-ormconfig).

```typescript
// src/index.ts
import "reflect-metadata";
import { createConnection } from "typeorm";

async function main() {
  await createConnection();
  console.log("Connected to DB!");

  // ...
}

main();
```

### Configuración de TypeGraphQL

TypeGraphQL es una librería que nos va a facilitar el desarrollo de nuestro backend GraphQL, esta librería generará automaticamente el esquema GraphQL, solo debemos crear los modelos y resolvers.

```typescript
// src/index.ts
import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import Container from "typedi";

async function main() {
  await createConnection();
  console.log("Connected to DB!");

  const schema = await buildSchema({
    resolvers: [
      __dirname + '/features/**/*.ts',
      __dirname + '/entity/**/*.ts',
    ],
    // Inyección de dependencias con TypeDi
    container: Container,
  });

  // ...
}

main();
```

### Apollo Server y Express

Con Apollo Server y Express creamos nuestro servidor.

```typescript
// src/index.ts
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as cors from 'cors';
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { ApolloServer } from "apollo-server-express";

async function main() {
  await createConnection();
  console.log("Connected to DB!");

  const schema = await buildSchema({
    resolvers: [
      __dirname + '/features/**/*.ts',
      __dirname + '/entity/**/*.ts',
    ],
    // Inyección de dependencias con TypeDi
    container: Container,
  });

  const apolloServer = new ApolloServer({
    schema,
  });
  await apolloServer.start();

  const app = express();
  app.use(cors());
  apolloServer.applyMiddleware({ app });

  const port = parseInt(process.env.PORT || '4000');
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
}

main();
```
