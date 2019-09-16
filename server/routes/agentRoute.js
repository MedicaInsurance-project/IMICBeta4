var express = require('express');
var router = express.Router();
const Agent = require('../models/agentModel');
var cryptography = require('../helper/cryptography');
const jwt = require('jsonwebtoken');

var agent = require("../controllers/agentController");


//agent sign-up

router.post('/create', function(req, res) {
    agent.save(req, res);
})

//agent-login
router.post('/agentLogin', (req, res) => {
    let agentDetails = req.body;
    console.log(agentDetails);
    Agent.findOne({ email: agentDetails.agentUsername }, (error, agent) => {
        if (error) {
            console.log(error);
        } else {
            if (!agent) {
                res.status(401).send('Invalid Email');
            } else {
                var passcode = cryptography.sha256(agentDetails.agentPassword);
                if (agent.password !== passcode) {
                    res.status(401).send('Invalid Password');
                } else {
                    var payload = { subject: agent._id };
                    var token = jwt.sign(payload, 'secretKey', { expiresIn: 1000 });
                    res.header('auth-token', token);
                    res.status(200).send({ token });
                }
            }

        }
    })
})

module.exports = router;