const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express()
const PORT = 3000;

const {v4: uuidv4} = require('uuid');
const messageReference = uuidv4();

const username = process.env.DHLAPIUSERNAME;
const password = process.env.DHLAPIPASSWORD;

const authString = `${username}:${password}`;

const base64auth = Buffer.from(authString).toString('base64');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())

app.post('/', async (req, res) => {
    try {
        const payload = req.body

        const queryParams = new URLSearchParams(payload).toString();

        const headers = {
            'Message-Reference': messageReference,  
            'x-version': '2.12.0', 
            'Authorization': 'Basic ' + base64auth
        };

        const externalResponse = await axios.get(`https://express.api.dhl.com/mydhlapi/test/rates?${queryParams}`, { headers });

        res.json(externalResponse.data);
        console.log(res);
    } catch (error){
        console.error("Error in proxy: ", error);
        res.status(500).json({ error: 'Failed to contact external API' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});