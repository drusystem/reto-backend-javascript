import { EmptyValueError } from "../../domain/exceptions/EmptyValueError";
import { APIGatewayEvent } from 'aws-lambda';

export const getTokenAuthCase = async (event:APIGatewayEvent): Promise<string> => {

    const authorizationHeader = event.headers['authorization'];
    
    if (!authorizationHeader) {
        throw new EmptyValueError('No autorizado')
    }

    const tokenBearer = authorizationHeader.split(' ')[1];

    return tokenBearer;
};