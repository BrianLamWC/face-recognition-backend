import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt-nodejs';
import knex from 'knex';
import {handleRegister} from './controllers/register.js';
import {handleSignin} from './controllers/signin.js';
import {handleProfile} from './controllers/profile.js';
import {handleAPICall, handleImage} from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
        // host : '127.0.0.1',
        // user : 'postgres',
        // password : '',
        // database : 'smart-brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json('connected');
})

app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt))

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => handleProfile(req, res, db))

app.put('/image', (req, res) => handleImage(req, res, db))

app.post('/imageurl', (req, res) => handleAPICall(req, res))

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}')
    console.log(process.env.DATABASE_URL);
});