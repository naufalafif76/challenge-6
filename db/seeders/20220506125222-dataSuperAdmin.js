'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordSupAdmin = await require('bcryptjs').hash(process.env.SUPERADMIN_PASSWORD, 10);
    await queryInterface.bulkInsert('users', [{
      email: 'pointbreak766@gmail.com',
      username: 'pointbreak',
      password: passwordSupAdmin,
      isAdmin: true,
      isSuperAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};