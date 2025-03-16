const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const { generateToken } = require('../utils/lib');
const { validationResult } = require("express-validator");
const logger = require("../utils/logger");
const { MESSAGES } = require("../utils/constants");

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error({ endpoint: req.url }, MESSAGES.VALIDATION_ERROR);
        return res.status(422).json({
            success: false,
            message: MESSAGES.VALIDATION_ERROR,
            errors: errors.array(),
        });
    }

    try {

        //find user
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        //user not found
        if (!user) {
            logger.info({ email: req.body.email }, MESSAGES.USER_NOT_FOUND);
            return res.status(404).json({
                success: false,
                message: MESSAGES.USER_NOT_FOUND,
            });
        }

        //compare password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        //password incorrect
        if (!validPassword) {
            logger.warn({ email: req.body.email }, MESSAGES.PASSWORD_ATTEMPT_LIMIT);
            return res.status(401).json({
                success: false,
                message: MESSAGES.PASSWORD_INCORRECT,
            });
        }

        // Destructure to remove password from user object
        const { password, ...userWithoutPassword } = user;

        const { token, formattedExpirationTime } = generateToken(user);

        logger.info({
            endpoint: req.url,
            user: userWithoutPassword,
            token: token,
            expired_at: formattedExpirationTime,
            message: MESSAGES.SUCCESS_LOGIN,
        });

        //return response
        res.status(200).send({
            success: true,
            message: MESSAGES.SUCCESS_LOGIN,
            data: {
                user: userWithoutPassword,
                token,
            },
        });
    } catch (error) {
        logger.error({ error, endpoint: req.url }, MESSAGES.ERROR_INTERNAL);
        res.status(500).send({
            success: false,
            message: MESSAGES.ERROR_INTERNAL,
        });
    }
};

module.exports = { login };