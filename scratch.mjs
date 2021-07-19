import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { Octokit, App } from "octokit";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import knex from 'knex/knex.js';
  const db = knex ({
    client: 'postgresql',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        user: 'postgres',
        password: null,
        database: 'github_dashboard'
    }
  });

  app.get('/show', (req,res)=>{
  db('users')
  .select('username')
  .then(data => {
    console.log(data);
    res.send(data)
  })
  .catch(err => {
    console.log(err);
    res.send({message:err.detail})
  })
})

app.post('/find', (req,res)=>{
  console.log(req.body);
  const {user} = req.body;
  db('users')
  .select('id','username')
  .where({username:user})
  .then(data => {
    console.log(data);
    if(data.length>0){
      res.send({message:`Found=> ${data[0].username} id=> ${data[0].id}`})
    }
    else {
      res.send({message:'Not Found'})
    }
  })
  .catch(err => {
    console.log(err);
    res.send({message:err.detail})
  })
})


app.get('/show', (req,res)=>{
  db('users')
  .select('username')
  .then(data => {
    console.log(data);
    res.send(data)
  })
  .catch(err => {
    console.log(err);
    res.send({message:err.detail})
  })
})

app.post('/find', (req,res)=>{
  console.log(req.body);
  const {user} = req.body;
  db('users')
  .select('id','username')
  .where({username:user})
  .then(data => {
    console.log(data);
    if(data.length>0){
      res.send({message:`Found=> ${data[0].username} id=> ${data[0].id}`})
    }
    else {
      res.send({message:'Not Found'})
    }
  })
  .catch(err => {
    console.log(err);
    res.send({message:err.detail})
  })
})
