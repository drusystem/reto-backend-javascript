import { randomBytes } from 'crypto';

interface TokenServiceI {
    generateToken(length: number): string;
}

export const tokenService:TokenServiceI={
    generateToken: (length:number):string =>{
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const randomBytesBuffer = randomBytes(length);
    
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = randomBytesBuffer.readUInt8(i) % chars.length;
            result += chars.charAt(randomIndex);
        }
        return result;
    }
}