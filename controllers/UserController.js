const prisma = require("../prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");
const { MESSAGES } = require("../utils/constants");

//function findUsers
const findUsers = async (req, res) => {
    try {

        //get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        logger.info({
            endpoint: req.url,
            message: MESSAGES.SUCCESS_GET_USERS,
        });

        //send response
        res.status(200).send({
            success: true,
            message: MESSAGES.SUCCESS_GET_USERS,
            data: users,
        });

    } catch (error) {
        logger.error({ error, endpoint: req.url }, MESSAGES.ERROR_INTERNAL);
        res.status(500).send({
            success: false,
            message: MESSAGES.ERROR_INTERNAL,
        });
    }
};

//function createUser
const createUser = async (req, res) => {
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
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        logger.info({
            endpoint: req.url,
            message: MESSAGES.SUCCESS_CREATE_USERS,
        });

        res.status(201).send({
            success: true,
            message: MESSAGES.SUCCESS_CREATE_USERS,
            data: user,
        });

    } catch (error) {
        logger.error({ error, endpoint: req.url }, MESSAGES.ERROR_INTERNAL);
        res.status(500).send({
            success: false,
            message: MESSAGES.ERROR_INTERNAL,
        });
    }
};

//function findUserById
const findUserById = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {

        //get user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        logger.info({
            endpoint: req.url,
            message: `Get user By ID :${id}`,
        });

        //send response
        res.status(200).send({
            success: true,
            message: `Get user By ID :${id}`,
            data: user,
        });

    } catch (error) {
        logger.error({ error, endpoint: req.url }, MESSAGES.ERROR_INTERNAL);
        res.status(500).send({
            success: false,
            message: MESSAGES.ERROR_INTERNAL,
        });
    }
};

//function updateUser
const updateUser = async (req, res) => {

    //get ID from params
    const { id } = req.params;
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

        //update user
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        logger.info({
            endpoint: req.url,
            message: MESSAGES.SUCCESS_UPDATE_USER,
        });

        //send response
        res.status(200).send({
            success: true,
            message: MESSAGES.SUCCESS_UPDATE_USER,
            data: user,
        });

    } catch (error) {
        logger.error({ error, endpoint: req.url }, MESSAGES.ERROR_INTERNAL);
        res.status(500).send({
            success: false,
            message: MESSAGES.ERROR_INTERNAL,
        });
    }
};

//function deleteUser
const deleteUser = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {

        //delete user
        await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        logger.info({
            endpoint: req.url,
            message: MESSAGES.SUCCESS_DELETE_USER,
        });

        //send response
        res.status(200).send({
            success: true,
            message: MESSAGES.SUCCESS_DELETE_USER,
        });

    } catch (error) {
        logger.error({ error, endpoint: req.url }, MESSAGES.ERROR_INTERNAL);
        res.status(500).send({
            success: false,
            message: MESSAGES.ERROR_INTERNAL,
        });
    }

};

module.exports = { findUsers, createUser, findUserById, updateUser, deleteUser };