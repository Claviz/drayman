'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('react/cjs/react-jsx-runtime.production.min.js');
} else {
    module.exports = require('react/cjs/react-jsx-runtime.development.js');
}
