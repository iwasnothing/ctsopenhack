const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
// Add middleware to authenticate requests
//app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/', (req, res) => res.send("ok") );
app.post('/', (req, res) => {
    //req.body.amount
    //req.body.month
    // Get the user's input from the form. Assume it is all valid.
    // Convert interest from a percentage to a decimal, and convert from
    // an annual rate to a monthly rate. Convert payment period in years
    // to the number of monthly payments.
    console.log("request");
    console.log(req.body);
    var principal = req.body.amount;
    var interest = req.body.interest / 100 / 12;
    var payments = req.body.month;
    console.log(interest.toString());

    // Now compute the monthly payment figure, using esoteric math.
    var x = Math.pow(1 + interest, payments);
    var monthly = Math.ceil( (principal*x*interest)/(x-1) );
    console.log(monthly.toString());

    // Check that the result is a finite number. If so, display the results.
    if (!isNaN(monthly) && 
        (monthly !== Number.POSITIVE_INFINITY) &&
        (monthly !== Number.NEGATIVE_INFINITY)) {

        console.log( monthly.toString() );
        var a = {'payment': 0.0};
        a['payment'] = monthly;
        console.log( a );
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(a));
        //res.send("ok");
        //document.loandata.total.value = round(monthly * payments);
        //document.loandata.totalinterest.value = round((monthly * payments) - principal);
    }
    // Otherwise, the user's input was probably invalid, so don't
    // display anything.
    else {
        res.send("not ok");
    }
});

// Expose Express API as a single Cloud Function:
exports.calculate = functions.https.onRequest(app);
