const router = require('express').Router();
let WaterComments = require('../../models/waterSaver/waterSaverComments');

//get all
router.route('/').get((req, res) => {
    WaterComments.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

//insert
router.route('/add').post((req, res) => {

    const userId = req.body.userId;
    const ideaId = req.body.ideaId;
    const comment = req.body.comment;

    const newWaterComment = new WaterComments({
        userId,
        ideaId,
        comment,
    });

    newWaterComment.save()
        .then(() => res.json('WaterComments added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get by idea ID
router.route('/:id').get((req, res) => {
    WaterComments.find({ ideaId: req.params.id})
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.route('/:id').delete((req, res) => {
    WaterComments.findByIdAndDelete(req.params.id)
        .then(() => res.json('WaterComments-Tip deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update details
router.route('/updateWaterComment/:id').post((req, res) => {
    WaterComments.findById(req.params.id)
        .then(water => {

            water.comment = req.body.comment;

            water.save()
                .then(() => res.json('WaterComments-Tip updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;