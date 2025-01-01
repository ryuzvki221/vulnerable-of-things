import { ObjectSchema, ValidationOptions } from "joi";
import * as express from "express";

const OPTS: ValidationOptions = {
    abortEarly: false,
    messages: {
        key: "{{key}} ",
    },
};

export function Validator(schema: ObjectSchema) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const params = req.method === "GET" ? req.params : req.body;
        const { error } = schema.validate(params, OPTS);
        if (error) {
            const { message } = error;
            return res.status(400).json({ message });
        } else {
            return next();
        }
    };
}
