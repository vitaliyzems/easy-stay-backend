const express = require('express');
const { register, login } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');

const router = express.Router({ mergeParams: true });

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(
      req.body.email,
      req.body.name,
      req.body.password
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.send({ error: error.message || 'Unknown error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.email, req.body.password);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.send({ error: error.message || 'Unknown error' });
  }
});

router.post('/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 0,
    })
    .send({});
});

module.exports = router;
