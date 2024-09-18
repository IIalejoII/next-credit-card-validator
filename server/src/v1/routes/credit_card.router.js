const express = require('express');

const router = express.Router();
const validateCreditCard = require('../controllers/credit_card.controller');

router
  .route("/validate_credit_card")
  .post(validateCreditCard);

router
    .route("/healthcheck")
    .get((req, res) => {
      res.send(`<h1>The Node Express server route ${req.baseUrl} is running up 🚀  </h1>`);
    })

module.exports = router;