import crypto from 'crypto';

export const shortId = () => {
    return crypto.randomBytes(16).toString('hex')
}