'use strict';
module.exports = function () {
    const path = require('path');
    return function urlNotFound(req, res, next) {
        res.sendFile(path.resolve(__dirname, '../../client/index.html'), function (err) {
            if (err) {
                console.error(err);
                res.status(err.status).end();
            }
        });
    };
};
