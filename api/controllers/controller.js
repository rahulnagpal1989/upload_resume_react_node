const dotenv = require('dotenv').config();
var formidable = require('formidable');
var fs = require('fs');
var {insertUserDetails, updateUserDetails} = require('../models/model');
var moment = require('moment');

exports.homePage = (req, res, next) => {
    res.status(200).send('Hello World!');
};

exports.saveResume = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if (!fields.first_name) return res.status(412).json({ code: 412, message: "Please enter first name", data: [] });
        if (!fields.email) return res.status(412).json({ code: 412, message: "Please enter email", data: [] });
        if (!fields.live_in_us) return res.status(412).json({ code: 412, message: "Please select live in US", data: [] });
        if (!fields.git_profile) return res.status(412).json({ code: 412, message: "Please enter Git profile", data: [] });
        if (!files.cv) return res.status(412).json({ code: 412, message: "Please upload cv", data: [] });
        if (!fields.about_you) return res.status(412).json({ code: 412, message: "Please enter about yourself", data: [] });

        let first_name = fields.first_name;
        let last_name = fields.last_name ?? '';
        let email = fields.email;
        let phone_number = fields.phone_number ?? '';
        let live_in_us = fields.live_in_us==='Yes' ? 1 : 0;
        let git_profile = fields.git_profile;
        let about_you = fields.about_you;

        let resumeId = await insertUserDetails(first_name, last_name, email, phone_number, live_in_us, git_profile, about_you);

        let oldpath = files.cv.filepath;
        let newpath = 'files/' +resumeId+'_'+(moment(new Date()).format("YYYYMMDDHHmmss"))+'_'+files.cv.originalFilename;
        fs.rename(oldpath, newpath, async function (err) {
            if (err) throw err;
            let cv = newpath;
            let cover_letter = files?.cover_letter?.originalFilename ?? '';
            if(cover_letter) {
                oldpath = files.cover_letter.filepath;
                newpath = 'files/' +resumeId+'_'+(moment(new Date()).format("YYYYMMDDHHmmss"))+'_'+files.cover_letter.originalFilename;
                fs.rename(oldpath, newpath, async function (err) {
                    if (err) throw err;
                    cover_letter = newpath;
                    resumeId = await updateUserDetails(cv, cover_letter);
                });
            } else {
                resumeId = await updateUserDetails(cv, cover_letter);
            }

            res.status(200).json({
                success: 1,
                id: resumeId,
                message: 'Resume uploaded successfully'
            });
        });
    });
};
