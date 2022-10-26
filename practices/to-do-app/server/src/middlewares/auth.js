const { body } = require("express-validator");
const { validate } = require("../utils/validation");
const { Request, Response } = require("express");
const { getData } = require("../utils/jwt");
/**
 * This function validate the request for register an user
 * @param {Request} request
 * @param {Response} response 
 */
const validateRequest = async (request) => {
    /**
     * El uso de express-validator nos devuelve un middleware
     */
    const rules = [
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
    ]

    return await validate(rules, request);

}

/**
 * This function validate the request for login a new user
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
module.exports.validateLogin = async (req, res, next) => {

    const result = await validateRequest(req);

    if (result.errors) {
        return res.status(400).json({
            errors: result.errors
        })
    }
    return next();
}
/**
 * This function evaluate the cookie header,
 * and extract the token, if the token exists
 * the next function is executed, in otherwise
 * return a status 401, forbidden
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
module.exports.validateToken = async (req, res, next) => {

    try {


        if (!req.headers.cookie) {
            return res.status(401).json({
                errors: [
                    {
                        message: "Cookie header must be sent"
                    }
                ]
            })
        }
        /**
         * Para extraer el token, realizamos un .split() 
         * con el separador de '=' y obtenemos la ultima posicion
         * de este array con el metodo .pop() 
         * 
         * Si quisiera obtener el primero, usariamos el .shift()
         */
        const token = req.headers.cookie?.split('=')?.pop()


        const user = getData(token);

        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        message: "Invalid token"
                    }
                ]
            })
        }

        next();

    } catch (error) {
        res.status(500).json({
            errors: [
                {
                    message: error.message
                }
            ]
        })
    }
}
