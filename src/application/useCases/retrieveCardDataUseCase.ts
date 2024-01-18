import { cardRepository } from '../../infrastructure/repositories/cardRepository';
import { cardInfoI } from '../interfaces/cardInfo.interface';

export const retrieveCardDataUseCase = async (token: string): Promise<cardInfoI> => {
    
    const cardData = await cardRepository.getCardDataByToken(token);
    const nuevaData:cardInfoI = JSON.parse(cardData)
    const {cardNumber,expiration_month,expiration_year,email} = nuevaData
    return {
        cardNumber,expiration_month,expiration_year,email
    };
};
