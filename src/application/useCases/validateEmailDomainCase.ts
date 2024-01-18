export const isDomainValid = (email: string): boolean => {
    const listDomains = [
        'gmail.com',
        'hotmail.com',
        'yahoo.es'
    ]

    const domainByEmail = email.split('@')[1];

    return listDomains.includes(domainByEmail);
};