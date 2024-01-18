import { APIGatewayProxyHandler,APIGatewayEvent,APIGatewayProxyResult} from 'aws-lambda'
import { generateTokenUseCase } from '../application/useCases/generateTokenUseCase';
import { generateTokenSchema } from '../application/schemas/generateToken.schema';
import { generateTokenI } from '../application/interfaces/generateToken.interface';
import { validateComercioCase } from '../application/useCases/validateComercioCase';
import { getTokenAuthCase } from '../application/useCases/getTokenAuthCase';


export const generateTokenHandler:APIGatewayProxyHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    
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
        const { error, value: cardInfo } = generateTokenSchema.validate(requestBody);

        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: error.message }),
            };
        }

        const token_card = await generateTokenUseCase(cardInfo as generateTokenI);

        return {
            statusCode: 200,
            body: JSON.stringify({
                token_card
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body:  JSON.stringify({error:"Internal Error"})
        };
    }
};