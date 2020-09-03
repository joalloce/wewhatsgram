const express = require('express');
const mongoose = require('mongoose')

const app = express();

const port = 8383;

app.listen(port);

app.get('/',(req,res) => res.send("hello"));