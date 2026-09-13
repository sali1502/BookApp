import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Gick inte att hämta böcker.';
        this.isLoading = false;
      }
    });
  }

  deleteBook(id: number): void {
    if (confirm('Är du säker på att du vill ta bort den här boken?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(b => b.id !== id);
        },
        error: () => {
          alert('Det gick inte att ta bort boken.');
        }
      });
    }
  }
}
