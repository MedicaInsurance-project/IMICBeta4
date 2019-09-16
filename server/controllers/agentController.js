//registration form for agent 

var Agent = require('../models/agentModel');

var agentController = {};

agentController.save = function (req, res, next) {
    var agent = new Agent({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
    })
    agent.setPassword(req.body.password);
    agent.save((err, agent) => {
        if (err) {
            let message = "";
            if (err.errors.email) message += "Email already exists.";
            if(err.errors.phone) message= " Phone number duplicate";
            if(err.errors.password) message= err;
            return res.json({
                success: false,
                message
            })
        } else {
            res.send(agent).status(200);
        };
    });

}

module.exports = agentController;