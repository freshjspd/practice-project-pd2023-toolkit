const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');
const contestController = require('../controllers/contestController');

const contestsRouter = Router();

contestsRouter.get(
  '/byCustomer',
  checkToken.checkToken,
  contestController.getCustomersContests
);

module.exports = contestsRouter;
