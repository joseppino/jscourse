const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation, requireEmailExists, requireValidPasswordForUser } = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup', 
  [
    requireEmail,
    requirePassword,
    requirePasswordConfirmation
  ],
  handleErrors(signupTemplate), 
  async (req, res) => {
    const { email, password } = req.body;

    if (password !== passwordConfirmation) {
      return res.send('Passwords must match');
    }

    // Create a user in user repo to represent this person
    const user = await usersRepo.create({ email, password });

    // Store the id of that user inside user's cookie
    req.session.userId = user.id;

    res.redirect('/admin/products');
});

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('Logged Out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post('/signin', [
    requireEmailExists,
    requireValidPasswordForUser
  ],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (!user) {
      return res.send('Email not found');
    }

    req.session.userId = user.id;

    res.redirect('/admin/products');
});

module.exports = router;