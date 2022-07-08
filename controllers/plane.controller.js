const Plane = require('../models/plane.model');

const createPlane = async ({name, capacity}) => {
    try {
        const plane = new Plane({
            name,
            capacity
        });
        
        await plane.save();
        return plane._id;
    } catch (err) {
        console.err(err);
        throw { status: 400, message: err};
    }
}

const findPlaneById = async id => {
    try {
        const plane = await Plane.findById(id);
        if(plane == null){
            throw `No airport with id: ${id} was found.`;
        }
        return plane;
    } catch (err) {
        console.log(err);
        throw { status: 400, message: err};
    }
}

const findAllPlanes = async (limit=0) => {
    const planes = await Plane.find();
    return planes;
}
const removePlaneById = async id => {
    try{
        const plane = await Plane.findByIdAndDelete(id);
        if(plane == null){
            throw `No airport with id: ${id} was found.`;
        }
        return plane;
    } catch(err){
        console.log(err);
        throw { status: 400, message: err};
    }
}
module.exports = {createPlane, findPlaneById, findAllPlanes, removePlaneById};