'use strict';
import Devices from './devices';
import Analytics from './analytics';
import Hubs from './hubs';
import User from './user';

export default (app) => {
    Devices(app);
    Analytics(app);
    Hubs(app);
    User(app);
};
