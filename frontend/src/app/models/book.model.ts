export interface Book {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  userId?: number;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  publishDate: string;
}

export interface UpdateBookRequest {
  title: string;
  author: string;
  publishDate: string;
}
