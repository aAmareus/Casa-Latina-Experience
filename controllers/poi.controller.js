import Poi from "../models/pois.js"

export const getPois = async (req, res) => {
    try {
        const points = await Poi.find({
            active: true,
        }).sort({
            createdAt: -1
        })

        return res.status(200).json(points)
    }catch(error){
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Couldn't get points of interest"
        })
    }
}

export const getPoidById = async (req, res) => {
    try {
        const point = await Poi.findById(req.params.id)

        if(!point){
            return res.status(404).json({
                message: "Point of interest not found"
            })
        }
    } catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Couldn't get point of interest"
        })
    }
}

export const createPointOfInterest = async (req, res) => {
    try {
        const {
            name,
            category,
            description,
            latitude,
            longitude,
            image,
            active
        } = req.body;

        if (
            !name ||
            !category ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                message: "Nombre, categoría, latitud y longitud son obligatorios"
            });
        }

        if (
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            return res.status(400).json({
                message: "Las coordenadas ingresadas no son válidas"
            });
        }

        const point = await Poi.create({
            name,
            category,
            description,
            latitude,
            longitude,
            image,
            active
        });

        res.status(201).json({
            message: "Punto de interés creado correctamente",
            point
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al crear el punto de interés"
        });
    }
};

export const updatePointOfInterest = async (req, res) => {
    try {
        const point = await Poi.findById(
            req.params.id
        );

        if (!point) {
            return res.status(404).json({
                message: "Punto de interés no encontrado"
            });
        }

        const {
            name,
            category,
            description,
            latitude,
            longitude,
            image,
            active
        } = req.body;

        if (
            latitude !== undefined &&
            (latitude < -90 || latitude > 90)
        ) {
            return res.status(400).json({
                message: "Latitud inválida"
            });
        }

        if (
            longitude !== undefined &&
            (longitude < -180 || longitude > 180)
        ) {
            return res.status(400).json({
                message: "Longitud inválida"
            });
        }

        if (name !== undefined) point.name = name;
        if (category !== undefined) point.category = category;
        if (description !== undefined) point.description = description;
        if (latitude !== undefined) point.latitude = latitude;
        if (longitude !== undefined) point.longitude = longitude;
        if (image !== undefined) point.image = image;
        if (active !== undefined) point.active = active;

        await point.save();

        res.status(200).json({
            message: "Punto de interés actualizado correctamente",
            point
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al actualizar el punto de interés"
        });
    }
};

export const deletePointOfInterest = async (req, res) => {
    try {
        const point = await Poi.findById(
            req.params.id
        );

        if (!point) {
            return res.status(404).json({
                message: "Punto de interés no encontrado"
            });
        }

        point.active = false;
        await point.save();

        res.status(200).json({
            message: "Punto de interés eliminado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al eliminar el punto de interés"
        });
    }
};