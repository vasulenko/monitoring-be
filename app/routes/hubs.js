'use strict';
import { errorWrapper } from '../../helpers/routes';
import { Hub } from '../../db/schema/hub';

module.exports = function(app) {

    app.get('/hubs', (req, res) => errorWrapper(req, res, async () => {
        Hub.find((err, hubs) => {
            if (err) return res.status(400).send({ err });
            res.status(200).send(hubs);
        });
    }));

};
