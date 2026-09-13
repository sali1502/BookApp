import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  isEditMode = false;
  bookId: number | null = null;
  title = '';
  author = '';
  publishDate = '';
  isLoading = false;
  errorMessage = '';
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.bookId = +idParam;
      this.loadBook(this.bookId);
    } else {
      // Use today's date when creating a new book.
      this.publishDate = new Date().toISOString().substring(0, 10);
    }
  }

  loadBook(id: number): void {
    this.isLoading = true;
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.title = book.title;
        this.author = book.author;
        this.publishDate = book.publishDate ? new Date(book.publishDate).toISOString().substring(0, 10) : '';
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Gick inte att läsa in boken.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.title || !this.author || !this.publishDate) {
      this.errorMessage = 'Fyll i alla fält.';
      return;
    }

    this.isLoading = true;
    const payload = {
      title: this.title,
      author: this.author,
      publishDate: this.publishDate
    };

    if (this.isEditMode && this.bookId) {
      this.bookService.updateBook(this.bookId, payload).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage = 'Gick inte att uppdatera boken.';
          this.isLoading = false;
        }
      });
    } else {
      this.bookService.createBook(payload).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage = 'Gick inte att skapa boken.';
          this.isLoading = false;
        }
      });
    }
  }
}
