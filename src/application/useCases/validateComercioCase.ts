import { cardRepository } from '../../infrastructure/repositories/cardRepository';

export const validateComercioCase = async (pk_comercio: string): Promise<boolean> => {
    return await cardRepository.validateComercio(pk_comercio); 
};