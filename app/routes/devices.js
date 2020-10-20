'use strict';
import { errorWrapper } from '../../helpers/routes';
import { Device } from '../../db/schema/device';

module.exports = function(app) {

    app.get('/devices', (req, res) => errorWrapper(req, res, async () => {
        Device.find((err, devices) => {
            if (err) return res.status(400).send({ err });
            res.status(200).send(devices);
        });
    }));

};
