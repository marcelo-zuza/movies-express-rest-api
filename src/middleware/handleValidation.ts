import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";



export const validade = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next();
    }
    const extratectError: object[] = []
    errors.array().map((err: any) => extratectError.push({[err.param]: err.msg}))

    return res.status(422).json({
        errors: extratectError
    })
}