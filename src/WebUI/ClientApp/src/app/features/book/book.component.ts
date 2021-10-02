import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, merge, Observable, timer } from 'rxjs';
import {
  distinctUntilChanged,
  mapTo,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Book } from 'src/app/core/models/book/book';
import { BooksService } from 'src/app/core/services/books/books.service';
import { PluralForm } from 'src/app/core/utils/plural-form';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService
  ) {}

  getPluralForm = PluralForm.getPluralForm;

  book$!: Observable<Book>;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.book$ = this.booksService.getBook(Number(params.get('id')));
    });
  }
}
