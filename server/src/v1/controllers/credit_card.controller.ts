import express = require('express');
import { CreditCardRequest, CreditCardResponse } from "../types/credit_card";

function check(num: number) {
    const arr = `${num}`
        .split('')
        .reverse()
        .map(x => Number.parseInt(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce(
        (acc, val, i) =>
            i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
        0
    );
    sum += lastDigit;
    return sum % 10 === 0;
}

const validateCreditCard = (req: express.Request, res: express.Response, next) => {
    const body: CreditCardRequest = req.body;
    if (typeof body.credit_card_number !== 'number') {
        const response: CreditCardResponse = {
            valid: false,
            credit_card_number: body.credit_card_number,
            title: 'Invalid card!',
            message: 'Wrong credit card number',
        }
        res.status(400).send(response);
    }

    try {
        const validCard = check(body.credit_card_number);
        const response: CreditCardResponse = {
            valid: validCard,
            credit_card_number: req.body.credit_card_number,
            title: validCard ? 'Valid card!' : 'Invalid card!',
            message: validCard ? "Valid credit card number" : "Invalid credit card number",
        };
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.json(response);
        next()
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e)
    }
}

module.exports = validateCreditCard;