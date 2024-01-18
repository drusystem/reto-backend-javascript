import { APIGatewayProxyHandler,APIGatewayProxyResult,APIGatewayEvent} from 'aws-lambda'
import { retrieveCardDataUseCase } from '../application/useCases/retrieveCardDataUseCase';
import { getTokenAuthCase } from '../application/useCases/getTokenAuthCase';
import { validateComercioCase } from '../application/useCases/validateComercioCase';
import { postInfoCardSchema } from '../application/schemas/postInfoCard.schema';


export const retrieveCardDataHandler:APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {

        const tokenAuth = await getTokenAuthCase(event);
        const api_key_valida = await validateComercioCase(tokenAuth);
        if(!api_key_valida){
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'No autorizado' }),
            };
        }

        const requestBody = JSON.parse(event.body || '{}');
        const { error, value: cardInfo } = postInfoCardSchema.validate(requestBody);
        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: error.message }),
            };
        }

        const cardData = await retrieveCardDataUseCase(cardInfo?.token_card);

        if(!cardData){
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "El token de la tarjeta expiró" }),
            };
        }

        return {
            statusCode: 200,
            body:  JSON.stringify(cardData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body:  JSON.stringify({error:"Internal Error"})
        };
    }
};