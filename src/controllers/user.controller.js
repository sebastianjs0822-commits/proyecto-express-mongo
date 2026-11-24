import * as service from "../services/user.service.js";

const responderError = (res, error) =>
    res.status(error.status || 500).json({ error: error.message });

export const register = async (req, res) => {
    try {
        return res.status(201).json(await service.registerUser(req.body));
    } catch (error) {
        return responderError(res, error);
    }
};

export const login = async (req, res) => {
    try {
        return res.status(200).json(await service.loginUser(req.body));
    } catch (error) {
        return responderError(res, error);
    }
};

export const getAll = async (req, res) => {
    try {
        return res.status(200).json(await service.listUsers());
    } catch (error) {
        return responderError(res, error);
    }
};
