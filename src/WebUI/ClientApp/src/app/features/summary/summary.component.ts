import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book/book';
import { Summary } from 'src/app/core/models/summary/summary';
import { BooksService } from 'src/app/core/services/books/books.service';
import { SummariesService } from 'src/app/core/services/summaries/summaries.service';
import { PluralForm } from 'src/app/core/utils/plural-form';
import { Random } from 'src/app/core/utils/random';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private summariesService: SummariesService,
    private booksService: BooksService,
    public oidcSecurityService: OidcSecurityService
  ) {}

  getPluralForm = PluralForm.getPluralForm;
  getRandomInt = Random.getRandomInt;

  summary$!: Observable<Summary>;
  book$!: Observable<Book>;
  isCreator = false;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.summary$ = this.summariesService
        .getSummary(Number(params.get('id')))
        .pipe(
          tap((s) => {
            this.isCreator =
              this.oidcSecurityService.getUserData()?.name === s.creator;
          })
        );

      this.book$ = this.summary$.pipe(
        mergeMap((s) => this.booksService.getBook(s.bookId))
      );
    });
  }
}
