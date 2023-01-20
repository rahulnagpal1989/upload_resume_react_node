var moment = require('moment');
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'resume_upload'
  });
   
connection.connect();

let resume_cv = "resume_cv";

function insertUserDetails(first_name, last_name, email, phone_number, live_in_us, git_profile, about_you) {
    var dt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    return new Promise((resolve, reject) => {
            let sqlParams = [
                resume_cv,
                {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone_number: phone_number,
                    live_in_us: live_in_us,
                    git_profile: git_profile,
                    about_you: about_you,
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                },
            ];
            connection.query("INSERT INTO ?? SET ?", sqlParams, function(error, result){
            if (error) {
                return reject(error);
            }
            return resolve(result.insertId);
        });
    });
}

function updateUserDetails(resume_id, cv, cover_letter='') {
    var dt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    return new Promise((resolve, reject) => {
        let sqlParams = [
            resume_cv,
            {
                cv: cv,
                cover_letter: cover_letter,
            },
            resume_id
        ];
        connection.query("UPDATE ?? SET ? WHERE id = ?", sqlParams, function(error, result){
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

module.exports = {
    insertUserDetails,
    updateUserDetails,
 }