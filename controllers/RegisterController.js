const prisma = require("../prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { MESSAGES } = require("../utils/constants");
const logger = require("../utils/logger");

const register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error({ endpoint: req.url }, MESSAGES.VALIDATION_ERROR);
        return res.status(422).json({
            success: false,
            message: MESSAGES.VALIDATION_ERROR,
            errors: errors.array(),
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        //insert data
        await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        logger.info({
            endpoint: req.url,
            message: MESSAGES.SUCCESS_REGISTER,
        }, MESSAGES.SUCCESS_REGISTER);

        //return response json
        res.status(201).send({
            success: true,
            message: MESSAGES.SUCCESS_REGISTER,
        });
    } catch (error) {
        logger.error({ error, endpoint: req.url }, MESSAGES.ERROR_INTERNAL);
        res.status(500).send({
            success: false,
            message: MESSAGES.ERROR_INTERNAL,
        });
    }
};

module.exports = { register };