const express = require('express');
const router = express.Router();

const haltOnTimedout = require('./../../core/middlewares/halt-on-timed-out');
const timeout = require('connect-timeout');

const PortfolioCtrl = require("./portfolio.controller");

router.get('/user/:userId', PortfolioCtrl.getList);
router.get('/', PortfolioCtrl.getList);
router.get('/:portfolioId', PortfolioCtrl.getOne);
router.post('/', PortfolioCtrl.newOne);
router.put('/:portfolioId', PortfolioCtrl.setOne);
router.delete('/:portfolioId', PortfolioCtrl.deleteOne);
router.get('/:portfolioId/image', PortfolioCtrl.getWorks);
router.post('/:portfolioId/image', timeout('30s', {respond: false}), haltOnTimedout, PortfolioCtrl.newWorks);
router.delete('/:portfolioId/image/:pictureId', PortfolioCtrl.deleteWork);

module.exports = router;