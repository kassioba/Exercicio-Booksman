import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import connection from "../database";
import prisma from "../database";

export async function getBooks() {
  const query = `SELECT * FROM books`;
  const result = await prisma.books.findMany();
  return result;
}

export async function getBook(id: number) {
  const query = `SELECT * FROM books WHERE id = $1`;
  const result = await prisma.books.findMany({
    where:{
      id
    }
  });
  return result;
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate } = book;
  const query = `
    INSERT INTO books (title, author, publisher, "purchaseDate")
    VALUES ($1, $2, $3, $4)`;

  const result = await prisma.books.create({
    data: book
  })

  return result;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  const query = `
    UPDATE books 
    SET
      grade = $1,
      review = $2,
      read = true 
    WHERE id = $3
  `;

  const result = await prisma.books.update({
    where: {
      id: bookId
    },
    data: {
      grade,
      review,
      read: true
    }
  });
  return result;
}