'use strict';
import md5 from 'md5';
import { errorWrapper } from '../../helpers/routes';
import { User } from '../../db/schema/user';
export const getUserHash = ({ email, password }) => {
    return md5(`${email}:${password}`);
};
module.exports = function(app) {
    app.get('/users', (req, res) => errorWrapper(req, res, async () => {

        User.find( (err, users) => {
            if (err) return res.status(400).send({ err });
            res.status(200).send(users);
        });
    }));

    app.get('/token/:hash', (req, res) => errorWrapper(req, res, async () => {
        const { params: { hash } } = req;
        console.log(hash);
        if (!hash) return res.status(400).send({ error: 'Missing hash' });

        User.find( (err, users) => {
            if (err) return res.status(400).send({ err });
            const userWithHashes = users.map(user => ({ ...user.getData(), hash: getUserHash(user.getData()) }));
            const user = userWithHashes.find(user => user.hash === hash);
            if (user) {
                console.log(user);
                return res.status(200).send({ token: user.token });
            }
            console.log(user);
            return res.status(404).send({ error: 'No such user!' });
        });
    }));
};
