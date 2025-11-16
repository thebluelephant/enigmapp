export const isEmail = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    const email = value.trim();
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}
