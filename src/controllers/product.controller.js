import * as service from "../services/product.service.js";

const responderError = (res, error) =>
    res.status(error.status || 500).json({ error: error.message });

export const getAll = async (req, res) => {
    try {
        return res.status(200).json(await service.listProducts());
    } catch (error) {
        return responderError(res, error);
    }
};

export const getById = async (req, res) => {
    try {
        return res.status(200).json(await service.getProduct(req.params.id));
    } catch (error) {
        return responderError(res, error);
    }
};

export const getByCategory = async (req, res) => {
    try {
        return res.status(200).json(await service.listByCategory(req.params.cat));
    } catch (error) {
        return responderError(res, error);
    }
};

export const create = async (req, res) => {
    try {
        return res.status(201).json(await service.createProduct(req.body));
    } catch (error) {
        return responderError(res, error);
    }
};

export const update = async (req, res) => {
    try {
        return res.status(200).json(await service.updateProduct(req.params.id, req.body));
    } catch (error) {
        return responderError(res, error);
    }
};

export const remove = async (req, res) => {
    try {
        await service.deleteProduct(req.params.id);
        return res.status(200).json({ mensaje: "Eliminado correctamente" });
    } catch (error) {
        return responderError(res, error);
    }
};
