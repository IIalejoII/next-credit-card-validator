"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function check(num) {
    var arr = "".concat(num)
        .split('')
        .reverse()
        .map(function (x) { return Number.parseInt(x); });
    var lastDigit = arr.shift();
    var sum = arr.reduce(function (acc, val, i) {
        return i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val);
    }, 0);
    sum += lastDigit;
    return sum % 10 === 0;
}
var validateCreditCard = function (req, res, next) {
    var body = req.body;
    if (typeof body.credit_card_number !== 'number') {
        var response = {
            valid: false,
            credit_card_number: body.credit_card_number,
            title: 'Invalid card!',
            message: 'Wrong credit card number',
        };
        res.status(400).send(response);
    }
    try {
        var validCard = check(body.credit_card_number);
        var response = {
            valid: validCard,
            credit_card_number: req.body.credit_card_number,
            title: validCard ? 'Valid card!' : 'Invalid card!',
            message: validCard ? "Valid credit card number" : "Invalid credit card number",
        };
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.json(response);
        next();
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e);
    }
};
module.exports = validateCreditCard;
