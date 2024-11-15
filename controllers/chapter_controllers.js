const {json} = require("express");
const Chapters = require("../models/Chapters");

module.exports.createChapters = async (req, res, next) => {
    const {name, numberLessons} = req.body;

    if (!name || !numberLessons) {
        return res.status(400).json({success: false, error: 'Veuillez remplir tous les champs'});
    }
    const ChaptersExist = await Chapters.findOne({name : name});

    if (ChaptersExist) {
        return res.status(400).json({success: false, error: 'Ce Chapitre existe déjà'});
    }

    const chapter = new Chapters({
        name,
        numberLessons
    });
    await chapter.save();
    return res.status(201).json({success: true, data: chapter});
}

module.exports.getChapters = async (req, res, next) => {
    const data = await Chapters.find({});
    return res.status(200).json({success: true, data: data});
}

module.exports.getChaptersById = async (req, res, next) => {
    const id = req.params.id;
    const data = await Chapters.findById(id);

    if (!data) {
        return res.status(404).json({success: false, error: `Chapitre non trouvé avec l'id donné ${id}`});
    }

    return res.status(200).json({success: true, data: data});
}

module.exports.deleteChapters = async (req, res, next) => {
    const id = req.params.id;
    const data = await Chapters.findByIdAndDelete(id);
    if (!data) {
        return res.status(200).json({success: true, message : "Chapitre supprimé"});
    }

}