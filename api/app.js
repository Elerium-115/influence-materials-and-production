const express = require('express');
const app = express();

// GET "/"
app.get(
    '/',
    (req, res) => {
        res.json({
            test: 'TEST'
        });
    }
);

app.listen(3000, () => {
    console.log(`--- listening on port 3000`);
});
