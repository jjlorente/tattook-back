const express = require('express');
const router = express.Router();
const PortfolioCtrl = require("./portfolio.controller");

router.get('/', PortfolioCtrl.getList);
router.get('/:portfolioId', PortfolioCtrl.getOne);
router.post('/', PortfolioCtrl.newOne);
router.put('/:portfolioId', PortfolioCtrl.setOne);
router.delete('/:portfolioId', PortfolioCtrl.deleteOne);
router.get('/:portfolioId/image', PortfolioCtrl.getWorks);
router.post('/:portfolioId/image', PortfolioCtrl.newWorks);

module.exports = router;