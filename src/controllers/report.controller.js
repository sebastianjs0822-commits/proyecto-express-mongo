import * as service from "../services/report.service.js";

export const statistics = async (req, res) => {
    try {
        return res.status(200).json(await service.getStatistics());
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};
