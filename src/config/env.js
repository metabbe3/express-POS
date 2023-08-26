const dotenv = require('dotenv');

switch (process.env.NODE_ENV) {
    case 'production':
        dotenv.config({ path: '.env.production' });
        break;
    default:
        dotenv.config({ path: '.env.development' });
}

module.exports = {
    PORT: process.env.PORT || 3000,
    // Add other environment-specific variables as needed
};
