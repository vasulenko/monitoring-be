'use strict';
import Devices from './devices';
import Analytics from './analytics';

export default (app) => {
    Devices(app);
    Analytics(app);
};
