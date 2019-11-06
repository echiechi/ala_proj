import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/adzService/book.service';
import { ActivatedRoute } from '@angular/router';
import { AdzBook } from 'src/app/adzModel/AdzBook';
import { MatCardModule } from '@angular/material/card';


import { Pipe, PipeTransform } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections/typings/selection';
import { MatListOption } from '@angular/material/list/typings/public-api';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

  transform(value: string, args: string[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

@Component({
  selector: 'app-adz-result',
  templateUrl: './adz-result.component.html',
  styleUrls: ['./adz-result.component.css']
})
export class AdzResultComponent implements OnInit {
  private query: string;
  books: AdzBook[];
  filtredBooks: AdzBook[];
  authors: string[];
  categories: string[];
  languages = [];
  filters = { authors: [], categories: [] };

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.query = this.route.snapshot.params.query;
    this.fetchBooks(this.query);
  }

  fetchBooks(query: any) {
    this.bookService.searchBooks(query)
      .subscribe(
        data => {
          this.books = data;
          this.filtredBooks = data;
          this.authors = this.bookService.getAuthors(data);
          this.categories = this.bookService.getCategories(data);
        }
      );
  }

  filter(optionList, filter: string) {
    let options = optionList.selectedOptions.selected.map(option => option.value);
    this.filters[filter] = this.bookService.filterBooks(filter, options, this.books);
    this.setFiltredBooks();
  }

  setFiltredBooks() {
    if (this.filters.authors.length === 0 && this.filters.categories.length === 0) {
      this.filtredBooks = this.books
    } else if (this.filters.authors.length === 0 && this.filters.categories.length !== 0) {
      this.filtredBooks = this.filters.categories;
    } else if (this.filters.authors.length !== 0 && this.filters.categories.length === 0) {
      this.filtredBooks = this.filters.authors;
    } else {
     this.filtredBooks = this.inter(this.filters.authors.concat(...this.filters.categories));
    }
  }

  inter(a: AdzBook[]) {
    let seen = {};
    return a.filter((item) => {
      let k = JSON.stringify(item);
      return !(seen.hasOwnProperty(k) ? false : (seen[k] = true));
    })
  }
}
