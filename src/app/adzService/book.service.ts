import { Injectable } from '@angular/core';
import { AdzBook } from '../adzModel/AdzBook';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GoogleBook } from '../adzModel/GoogleBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  searchBooks(query: string) {
    return this.http.get<GoogleBook>(`https://www.googleapis.com/books/v1/volumes?q=${query}`).pipe(
      map(data => data.items.map((item: any) => new AdzBook(
        item.volumeInfo.title,
        item.volumeInfo.authors,
        item.volumeInfo.pageCount,
        item.volumeInfo.publishedDate,
        item.volumeInfo.language,
        item.volumeInfo.categories,
        item.volumeInfo.imageLinks
      ))),
    );
  }

  getAuthors(books: AdzBook[]): string[] {
    return [].concat(...books.map(book => book.authors).filter(x => !!x));
  }

  getCategories(books: AdzBook[]): string[] {
    return [].concat(...books.map(book => book.categories).filter(x => !!x));
  }

  filterBooks(key: string, list: string[], books: AdzBook[]): AdzBook[] {
    return books.filter(book => (book[key]) ?
      book[key].some(x => list.indexOf(x) >= 0) :
      false);
  }
}
