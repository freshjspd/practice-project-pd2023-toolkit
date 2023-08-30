const { Router } = require('express');
const { queryParser } = require('express-query-parser');
const checkToken = require('../middlewares/checkToken');
const contestController = require('../controllers/contestController');

const contestsRouter = Router();

contestsRouter.get(
  '/byCustomer',
  checkToken.checkToken,
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  }),
  contestController.getCustomersContests
);

module.exports = contestsRouter;
