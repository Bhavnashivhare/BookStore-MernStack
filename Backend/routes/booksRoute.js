import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    // Fetch the book by its ID
    const book = await Book.findById(id);

    // If no book is found
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    // Return the found book data
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    console.log('Request body:', request.body);  // Log the request body for debugging

    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true });

    if (!updatedBook) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).json({
      message: 'Book updated successfully',
      book: updatedBook,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
// Route for Delete a book

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params; // Get the ID from the URL parameters

    // Attempt to find and delete the book by ID
    const result = await Book.findByIdAndDelete(id);

    // If no book is found, return a 404 error
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    // Return a success message
    return response.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    // Log the error and send a 500 response if something goes wrong
    console.log(error.message);
    return response.status(500).json({ message: 'Server error, could not delete book' });
  }
});

export default router;