'use strict';

const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'customerN',
          lastName: 'customerL',
          displayName: 'customerDN',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'customer@mail.com',
          role: 'customer',
        },
        {
          firstName: 'creatorN',
          lastName: 'creatorL',
          displayName: 'creatorDN',
          password: bcrypt.hashSync('123456', SALT_ROUNDS),
          email: 'creator@mail.com',
          role: 'creator',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
