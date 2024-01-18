import { generateTokenI } from '../../application/interfaces/generateToken.interface';
import { HttpError } from '../../domain/exceptions/HttpError';
import { closeCacheConnection, getCache } from '../services/cacheService';
const { REDIS_TTL } = process.env;

export interface CardRepository {
    saveToken(cardInfo: generateTokenI, token: string): Promise<void>;
    getCardDataByToken(token: string): Promise<string>;
    validateComercio(pk_comercio:string):Promise<boolean>;
}

export const cardRepository: CardRepository = {
    saveToken: async (cardInfo: generateTokenI, token: string): Promise<void> => {
        const cache = await getCache()
        cache.setEx(token, Number(REDIS_TTL), JSON.stringify(cardInfo))
        await closeCacheConnection()
      },
    
    getCardDataByToken: async(token:string):Promise<string> =>{

        const cache = await getCache()
        const responseRedis = await cache.get(token);
        if(!responseRedis){
            throw new HttpError(401,{error:'el token de la tarjeta expiró'})
        }
        await closeCacheConnection()
        return responseRedis;
    },

    validateComercio: async(pk_comercio:string):Promise<boolean>=>{
        return pk_comercio==='pk_test_LFEhf23dfdFFF'
    }
};