const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const activitiesRoutes = require('./routes/api/endpoints')

const path = require('path')


app.use(cors())
app.use(morgan('tiny'))

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/', activitiesRoutes)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}



app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))

