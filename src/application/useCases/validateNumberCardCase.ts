export const isLuhnValid = (value: number): boolean => {
    const sanitizedValue = String(value).replace(/\D/g, '');  // Eliminar caracteres no numéricos
    let sum = 0;
    let alternate = false;

    for (let i = sanitizedValue.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedValue.charAt(i), 10);

        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        alternate = !alternate;
    }

    return sum % 10 === 0;
};