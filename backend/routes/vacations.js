const   express = require("express"),
        router = express.Router(),
        Vacation = require('../models/Vacation.js');
        User = require('../models/User.js');

// Get all vacations
router.get('/', function (req,res) {
    Vacation.find(function(err, data){
        if(err) {
            return err;
        }

        res.send(data)
    });
});

// Insert new vacation
router.post('/', function (req,res) {
    const vacation = new Vacation(req.body);
    vacation.save(function(err) {
        if (err) {
            res.status(500)
                .send(err);
        } else {
            res.status(201).send("Vacation Saved!");
        }
    });

});

// Update existing vacation
router.put('/:id', function (req,res) {
    Vacation.findByIdAndUpdate(req.params.id, req.body,{ new: true }, (err, vacation) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(vacation);
        }
    )
});

// Delete existing vacation
router.delete('/:id', function (req,res) {
    Vacation.findByIdAndRemove(req.params.id, (err, vacation) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "vacation successfully deleted",
            id: vacation._id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;
