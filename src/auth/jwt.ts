import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'ADA64D6AD!#$%#$rgbetg%#$Cqdv#!$cvq!$"4A31D3A4DA6DA1$%&//%$1313134876vb$%#&4654'

export const signToken = (payload: object, expiresIn: any = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export const verifyToken = (token: string) =>
    jwt.verify(token, JWT_SECRET);