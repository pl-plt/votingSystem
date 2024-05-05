require('dotenv').config()

const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const User = require('./user')
const Code = require('./code')


// incude static files 
app.use(express.static('views'));

// auth



// end auth 

// database
uri = ''
if(process.env.PRODUCTION==="true"){
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

  uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
  
}else{
  uri = process.env.DATABASE_URL;
}

console.log("<<<<<")
console.log(uri)
console.log(".>>>>")



function connectToMongoDB() {
  mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
      console.log('[success] Connected to MongoDB');
    })
    .catch((error) => {
      console.log('[Error] Did not Connect to MongoDB');
      console.error('Error connecting to MongoDB:', error);
      setTimeout(connectToMongoDB, 5000); // try after 5sec (because docker compose build in parallel)
    });
}

connectToMongoDB();


app.use(express.json())

const usersRouter = require('./routes')
const codesRouter = require('./routesCode')

app.use('/users', usersRouter)
app.use('/codes', codesRouter)

// end database bloc 

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('index.ejs', { page_name_ejs: "index",  });
})


// static pages
app.get('/home', (req, res) => {
  res.render('index.ejs', { page_name_ejs: "index",  });
});




app.get('/code', (req, res) => {
  res.render('code.ejs', { page_name_ejs: "Code",  })
})
app.get('/vote', (req, res) => {
  res.render('vote.ejs', { page_name_ejs: "Vote" ,  })
})
app.get('/auth', (req, res) => {
  res.render('login.ejs', { page_name_ejs: "Authentification" ,  })
})

app.get('/results', (req, res) => {
  res.render('resutls.ejs', { page_name_ejs: "Results" ,  })
})






console.log(`Listening on >>>> http://localhost:4000`);


app.listen(4000)