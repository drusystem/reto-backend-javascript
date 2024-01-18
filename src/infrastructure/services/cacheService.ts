/* eslint-disable no-inline-comments */
import { createClient, RedisClientType  } from 'redis';
const { REDIS_PORT, REDIS_HOST } = process.env;

let redisClient: RedisClientType
let isReady: boolean

const cacheOptions = {
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    socket:{
        tls:false
    }
}

async function getCache(): Promise<RedisClientType> {
    if (!isReady) {
      redisClient = createClient({
        ...cacheOptions,
      });
  
      redisClient.on('error', (err) => console.error(`Error de Redis: ${err}`));
      redisClient.on('connect', () => console.log('Conexión con Redis establecida'));
      redisClient.on('reconnecting', () => console.log('Reconexión con Redis'));
      
      try {
        await redisClient.connect();
        isReady = true;
        console.log('¡Redis listo!');
      } catch (err) {
        console.error({ err }, 'Error al conectar con Redis');
      }
    }
    return redisClient;
  }
  
  async function closeCacheConnection(): Promise<void> {
    if (redisClient && isReady) {
      await redisClient.quit();
      console.log('Conexión con Redis cerrada');
      isReady = false;
    }
  }
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Rechazo no manejado en:', promise, 'razón:', reason);
  });
  
  export {
    getCache,
    closeCacheConnection,
  };