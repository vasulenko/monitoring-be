'use strict';
import { errorWrapper } from '../../helpers/routes';
import { Analytic } from '../../db/schema/analytic';
import { Device } from '../../db/schema/device';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();

module.exports = function(app) {
    app.get('/analytics', (req, res) => errorWrapper(req, res, async () => {

        Analytic.find({ timestamp: { $gte: Date.now() - 7 *  604800000 } }, (err, analytics) => {
            if (err) return res.status(400).send({ err });
            res.status(200).send(analytics);
        });
    }));

    app.post('/analytics', jsonParser, (req, res) => errorWrapper(req, res, async () => {
        if (!req.body) return res.status(400).send({ error: 'Missing body' });

        const {deviceId, hubId, data} = req.body;

        const analytic = new Analytic({deviceId, hubId, data});

        analytic.save((err, analytic) => {
            if (err) return res.status(400).send({ err });

            res.status(201).send(analytic.getData());
        });
        Device.updateOne({ deviceId }, { ...data, lastUpdate: Date.now() });
    }));
};
