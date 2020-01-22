const express = require('express');

const app = express();

const PORT = 5000;

app.get('/api/timestamp/:date_string?', function (req, res) {
    try {
        const timeStamp = req.params.date_string;

        let date = new Date(timeStamp);

        const result = {"unix": null ,"utc": null};

        if(timeStamp === undefined) {
            date = new Date();
            result["unix"] = date.getTime();
            result["utc"] = date.toUTCString();
        } else if(timeStamp.toString().split('-').length === 3 && timeStamp.toString().split('-').every((item) => isFinite(item))) {
            result["unix"] = date.getTime();
            result["utc"] = date.toUTCString();
        } else if(!isNaN(Number(timeStamp))) {
            date = new Date(Number(timeStamp) * 1000);
            result["unix"] = timeStamp;
            result["utc"] = date.toUTCString();
        } else {
            throw new Error();
        }

        res.json(result);
    } catch (e) {
        res.json({"error" : "Invalid Date" });
    }
});

(async function start(){
    try {
        app.listen(PORT, () => console.log('App has been started...'));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
})();
//
// start();
