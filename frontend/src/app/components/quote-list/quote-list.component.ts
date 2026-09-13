import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  quotes: Quote[] = [];
  isLoading = true;
  errorMessage = '';

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
