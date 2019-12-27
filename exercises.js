const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const gender = req.body.gender;
  const email = req.body.email;
  const news = req.body.news;
  const photo = req.body.photo;

  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username ,
    gender ,
    date, // date de naissance
    news ,
    email ,
    photo  ,
  });

  newExercise.save()
  .then(() => res.json( 'user added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('user  deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        exercise.username= req.body.username;
        exercise.gender = req.body.gender;
        exercise.photo= req.body.photo;
        exercise.new= req.body.new;
        exercise.email= req.body.email;

        exercise.date = Date.parse(req.body.date);
  
        exercise.save()
          .then(() => res.json('user updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;