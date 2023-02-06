const controller = require('../controllers/controller.js');
var request = require("request");
var fs = require('fs');

describe('test user controller', () => {
    test('test home page', () => {
        request.get('http://localhost:4000/', function(error, response, body) {
            expect(response.statusCode).toEqual(200);
        });
    });

    test('test expect error when first_name is missing', () => {
        request.post({url:'http://localhost:4000/post', formData: {
                first_name:'', email: 'aa@a.com', live_in_us: 1, git_profile: 'http://linkedin.com', cv: fs.createReadStream(__dirname + '/Demo.png'), about_you:'abc'
            }}, function(error, response, body) {
                expect(response.statusCode).toEqual(412);
        });
    });

    test('test expect error when email is missing', () => {
        request.post({url:'http://localhost:4000/post', formData: {
                first_name:'abc', email: '', live_in_us: 1, git_profile: 'http://linkedin.com', cv: fs.createReadStream(__dirname + '/Demo.png'), about_you:'abc'
            }}, function(error, response, body) {
                expect(response.statusCode).toEqual(412);
        });
    });

    test('test expect error when live in US is missing', () => {
        request.post({url:'http://localhost:4000/post', formData: {
                first_name:'abc', email: 'aa@a.com', live_in_us: '', git_profile: 'http://linkedin.com', cv: fs.createReadStream(__dirname + '/Demo.png'), about_you:'abc'
            }}, function(error, response, body) {
                expect(response.statusCode).toEqual(412);
        });
    });

    test('test expect error when git profile is missing', () => {
        request.post({url:'http://localhost:4000/post', formData: {
                first_name:'abc', email: 'aa@a.com', live_in_us: 0, git_profile: '', cv: fs.createReadStream(__dirname + '/Demo.png'), about_you:'abc'
            }}, function(error, response, body) {
                expect(response.statusCode).toEqual(412);
        });
    });

    test('test expect error when cv is missing', () => {
        request.post({url:'http://localhost:4000/post', formData: {
                first_name:'abc', email: 'aa@a.com', live_in_us: 0, git_profile: 'http://linkedin.com', cv: '', about_you:'abc'
            }}, function(error, response, body) {
                expect(response.statusCode).toEqual(412);
        });
    });

    test('test expect error when about yourself is missing', () => {
        request.post({url:'http://localhost:4000/post', formData: {
                first_name:'abc', email: 'aa@a.com', live_in_us: 0, git_profile: 'http://linkedin.com', cv: fs.createReadStream(__dirname + '/Demo.png'), about_you:''
            }}, function(error, response, body) {
                expect(response.statusCode).toEqual(412);
        });
    });
    
    test('test insert data', () => {
        request.post({url:'http://localhost:4000/post', formData: {
                first_name:'abc', email: 'aa@a.com', live_in_us: 1, git_profile: 'http://linkedin.com', cv: fs.createReadStream(__dirname + '/Demo.png'), about_you:'abc'
            }}, function(error, response, body) {
                expect(response.statusCode).toEqual(200);
        });
    });
});