'use strict';
import { errorWrapper, generateValue } from '../../helpers/routes';
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


    app.get('/analytics/:id', (req, res) => errorWrapper(req, res, async () => {
        const { params: { id } } = req;

        if (!id) return res.status(400).send({ error: 'Missing device id' });

        Analytic.find({ timestamp: { $gte: Date.now() - 7 * 24 * 60 * 60 * 1000 }, deviceId: id }, (err, analytics) => {
            if (err) return res.status(400).send({ err });
            res.status(200).send(analytics.map(el => el.getAnalytic()));
        });
    }));

    app.get('/analytics-seed', (req, res) => errorWrapper(req, res, async () => {
        for (let i = 0; i < 7 * 24; i++) {
            const seed = {
                data: {
                    a: generateValue(0, 1).toFixed(1),
                    h: generateValue(1, 90).toFixed(1),
                    t: generateValue(8, 35).toFixed(1),
                },
                timestamp: Date.now() - ((i + 1) * 60 * 60 * 1000),
                deviceId: 4,
                hubId: 2
            };
            const analytic = new Analytic(seed);
            analytic.save();
            console.log(seed);
        }
        return res.status(200).send();
    }));
    app.get('/analytics-seed-update', (req, res) => errorWrapper(req, res, async () => {
        Device.find((err, data) => {
            data.map(el => Device.updateOne({ _id: el._id }, {
                   battery: parseInt(generateValue(10, 100), 10)
                }, (err, res) => {
                console.log(res);
            }))
        })
        return res.status(200).send();
    }));
};
