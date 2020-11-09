import crypto from 'crypto';

/**
 * "Give me some short ids!" - M. Gandhi
 */ 
export const shortId = () => {
    return crypto.randomBytes(16).toString('hex')
}