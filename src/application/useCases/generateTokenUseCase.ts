import { cardRepository } from '../../infrastructure/repositories/cardRepository';
import { generateTokenI } from '../interfaces/generateToken.interface';
import {tokenService} from '../../infrastructure/services/tokenService';

export const generateTokenUseCase = async (cardData: generateTokenI): Promise<string> => {
    
    const token = await tokenService.generateToken(16)
    await cardRepository.saveToken(cardData, token);
    return token; 
};
