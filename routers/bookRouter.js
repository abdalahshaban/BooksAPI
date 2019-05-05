const express = require('express');
const booksRouter = express.Router();
const Book = require('../models/bookModel');

booksRouter
	.route('/')
	.get((req, res) => {
		Book.find({}, (err, books) => {
			if (err) {
				res.sendStatus(404).json({ message: 'error' });
			} else {
				res.json(books);
			}
		});
	})
	.post((req, res) => {
		let book = new Book(req.body);
		book.save();
		res.sendStatus(201).json({ message: 'created' });
	});

booksRouter
	.route('/:bookId')
	.put((req, res) => {
		Book.findById(req.params.bookId, (err, book) => {
			(book.title = req.body.title), (book.author = req.body.author);

			book.save();
			res.json(book);
		});
	})
	.delete((req, res) => {
		Book.findByIdAndDelete(req.params.bookId, (err, result) => {
			if (err) {
				res.sendStatus(500);
			} else {
				res.send(result);
			}
		});
	});

module.exports = booksRouter;
