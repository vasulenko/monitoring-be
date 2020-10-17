require('@babel/register')({
    'presets': [
        [
            '@babel/preset-env', {
                'targets': {
                    'node': 'current'
                }
            }
        ]
    ]
});
require('dotenv').config();
// Import the rest of our application.
module.exports = require('./index.js');
