export interface Quote {
  id: number;
  text: string;
  author: string;
  userId?: number;
}

export interface CreateQuoteRequest {
  text: string;
  author: string;
}

export interface UpdateQuoteRequest {
  text: string;
  author: string;
}
