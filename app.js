const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const userData = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(userData);

    const apiId = "a4527bee98d0f74cbddcd3a571e00e695-us10";
    const audienceId = "1ce8ea0286";
    const url = "https://us10.api.mailchimp.com/3.0/lists/" + audienceId;

    const options = {
        method: "POST",
        auth: "vishu1:" + apiId
    }

    const request = https.request(url, options, function (response) {
        console.log(response.statusCode);
        // response.on("data", function (data) {
        //     console.log(data));
        // });
        if (response.statusCode === 200)
            res.sendFile(__dirname + "/success.html");
        else
            res.sendFile(__dirname + "/failure.html");

    });

    request.write(jsonData);
    request.end();


});

app.post("/failure", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.listen(3000, function () {
    console.log("Server running on port 3000");
});

// api id: 4527bee98d0f74cbddcd3a571e00e695-us10
// audience id: 1ce8ea0286