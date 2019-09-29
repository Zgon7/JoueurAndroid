const clientResolver = require('./client');
const courseResolver = require('./course');

const rootResolver = {
    ...clientResolver,
    ...courseResolver

};

module.exports = rootResolver;