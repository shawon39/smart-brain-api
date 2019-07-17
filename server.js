const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const { Client } = require('pg')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'sh563486',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then( data => {
  //console.log(data);
});

const app =  express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'shawon',
      email: 'shawon@gmail.com',
      password: 'shawon',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sakib',
      email: 'sakib@gmail.com',
      password: 'sakib',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'shawon@gmail.com'
    }
  ]
}

app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db) })

app.listen(3000, () => {
  console.log('app is running on port on 3000');
})