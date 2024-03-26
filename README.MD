
# TOKENIZACION TARJETAS SERVERLESS

Solución serverless para la tokenización de tarjetas en la nube de AWS por medio de servicio LAMBDA.


## Requisitos previos

- Tener una base de datos redis en local.

- Tener configurado el usuario AWS CLI con los permisos correspondientes.


## Ejecutar proyecto localmente

Clonar el proyecto

```bash
  git clone https://github.com/drusystem/reto-backend-javascript.git
```

Ingresar a la carpeta del proyecto
```bash
  cd reto-backend-javascript
```

Instalar dependencias
```bash
  npm install
```

Configurar host y puerto de REDIS en el archivo "serverless.yml"
```bash
  REDIS_PORT: 6379
  REDIS_HOST: localhost
```

Inicializar servicio local
```bash
  npm run start
```

OPCIONAL: Generar el build de la aplicación ( dist / .serverless)
```bash
  npm run build
```


## Despliegue

Configurar host y puerto de REDIS en el archivo "serverless.yml"
```bash
  REDIS_PORT: !GetAtt MyElasticacheCluster.RedisEndpoint.Port
  REDIS_HOST: !GetAtt MyElasticacheCluster.RedisEndpoint.Address
```

Inicializar despliegue
```bash
  npm run deploy
```


## Notas

El primer despliegue en producción puede tardar minutos debido a todas las configuraciones iniciales y servicios en AWS que debe levantar el proyecto.


## FAQ

#### ¿Cómo desinstalar los servicios aws levantados por el deploy?
```bash
  npm run remove
```

