const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const booksRouter = require('./routers/bookRouter');

const app = express();
//midleware
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/books', booksRouter);

app.listen(config.PORT, () => {
	mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false });
});

const db = mongoose.connection;

db.on('error', (err) => {
	console.log(err);
});

db.once('open', () => {
	//require('./routers/bookRouter')(app);
	// require('./routes/users')(server);

	console.log('db open');

	console.log(`Server Started on port ${config.PORT} 🔥`);
});
