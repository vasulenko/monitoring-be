'use strict';
import bodyParser from 'body-parser';
import { errorWrapper } from '../../helpers/routes';
import { Device } from '../../db/schema/device';

const jsonParser = bodyParser.json();

module.exports = function(app) {

    app.get('/devices', (req, res) => errorWrapper(req, res, async () => {
        Device.find((err, devices) => {
            if (err) return res.status(400).send({ err });
            res.status(200).send(devices);
        });
    }));

    app.get('/device/:id', (req, res) => errorWrapper(req, res, async () => {
        const { params: { id } } = req;
        if (!id) return res.status(400).send({ error: 'Missing device id' });

        Device.findOne({ deviceId: id }, (err, device) => {
            if (err) return res.status(400).send({ err });
            res.status(200).send(device.getData());
        });
    }));

    app.put('/device/:id', jsonParser, (req, res) => errorWrapper(req, res, async () => {
        const { params: { id } } = req;
        if (!id) return res.status(400).send({ error: 'Missing device id' });
        if (!req.body) return res.status(400).send({ error: 'Missing body' });

        const { mac_hash = '' } = req.body;

        Device.updateOne({ deviceId: id }, { macHash: mac_hash }, (err, device) => {
            if (err) return res.status(400).send({ err });
            res.status(200).send(device);
        });
    }));
};
