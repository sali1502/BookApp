import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  isEditMode = false;
  quoteId: number | null = null;
  text = '';
  author = '';
  isLoading = false;
  errorMessage = '';

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.quoteId = Number(idParam);
      this.loadQuote(this.quoteId);
    }
  }

  loadQuote(id: number): void {
    this.isLoading = true;
    this.quoteService.getQuote(id).subscribe({
      next: (quote) => {
        this.text = quote.text;
        this.author = quote.author;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Gick inte att läsa in citatet.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.text.trim() || !this.author.trim()) {
      this.errorMessage = 'Fyll i både citattext och upphovsperson.';
      return;
    }

    this.isLoading = true;
    const payload = { text: this.text.trim(), author: this.author.trim() };

    if (this.isEditMode && this.quoteId !== null) {
      this.quoteService.updateQuote(this.quoteId, payload).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: (error) => {
          this.errorMessage = error.error?.message || 'Gick inte att uppdatera citatet.';
          this.isLoading = false;
        }
      });
      return;
    }

    this.quoteService.createQuote(payload).subscribe({
      next: () => this.router.navigate(['/quotes']),
      error: (error) => {
        this.errorMessage = error.error?.message || 'Gick inte att skapa citatet.';
        this.isLoading = false;
      }
    });
  }
}
