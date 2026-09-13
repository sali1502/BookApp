import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  quotes: Quote[] = [];
  isLoading = true;
  errorMessage = '';

  // Form state
  showForm = false;
  editingQuoteId: number | null = null;
  text = '';
  author = '';

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.isLoading = true;
    this.quoteService.getQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Gick inte att hämta citat.';
        this.isLoading = false;
      }
    });
  }

  openAddForm(): void {
    this.editingQuoteId = null;
    this.text = '';
    this.author = '';
    this.showForm = true;
  }

  openEditForm(quote: Quote): void {
    this.editingQuoteId = quote.id;
    this.text = quote.text;
    this.author = quote.author;
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingQuoteId = null;
    this.text = '';
    this.author = '';
  }

  saveQuote(): void {
    if (!this.text || !this.author) {
      alert('Fyll i både citattext och upphovsperson.');
      return;
    }

    if (this.editingQuoteId) {
      this.quoteService.updateQuote(this.editingQuoteId, { text: this.text, author: this.author }).subscribe({
        next: () => {
          this.loadQuotes();
          this.cancelForm();
        },
        error: () => alert('Gick inte att uppdatera citat.')
      });
    } else {
      this.quoteService.createQuote({ text: this.text, author: this.author }).subscribe({
        next: () => {
          this.loadQuotes();
          this.cancelForm();
        },
        error: () => alert('Gick inte att skapa citat.')
      });
    }
  }

  deleteQuote(id: number): void {
    if (confirm('Vill du ta bort detta citat?')) {
      this.quoteService.deleteQuote(id).subscribe({
        next: () => {
          this.quotes = this.quotes.filter(q => q.id !== id);
        },
        error: () => alert('Gick inte att ta bort citat.')
      });
    }
  }
}
