# Backend

## Pacotes usados
    - Express
    - Mongo DB


## Utilidade

Criar a pasta resized:
```bash
    mkdir ./uploads/resized
```

Criar o arquivo .env:
```bash
    touch .env
```
Adicionar as variaveis de ambiente:
    JWT_SECRET=""

## Docker

Inicio
    docker-compose -f "docker-compose.yml" up -d --build

mostrando dependencias das imagens
    - docker inspect --format='{{.Id}} {{.Parent}}' $(docker images --filter since=<image_id> -q)

## errors

    MongoDb com Docker (connect ECONNREFUSED 127.0.0.1:27017)
    docker run -d -it -p 27017:27017 mongo
