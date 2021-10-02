import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { MenuItem, MessageService, SelectItemGroup } from 'primeng/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookInfo } from 'src/app/core/models/book/book-info';
import { PaginatedBookList } from 'src/app/core/models/book/paginated-book-list';
import { Label } from 'src/app/core/models/label/label';
import { AddSummary } from 'src/app/core/models/summary/add-summary';
import { SummaryInfo } from 'src/app/core/models/summary/summary-info';
import { BooksService } from 'src/app/core/services/books/books.service';
import { LabelsService } from 'src/app/core/services/labels/labels.service';
import { SummariesService } from 'src/app/core/services/summaries/summaries.service';

interface City {
  name: string;
  code: string;
}

interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  displayRules: boolean = false;

  activePage: number = 0;
  selectedBook?: BookInfo;
  aboutSummary: string = '';

  summary!: AddSummary;

  defaultPageSize: number = 10;
  firstRow: number = 0;

  isLoading: boolean = false;

  searchTitle: string = '';

  bookList$!: Observable<PaginatedBookList>;

  labelsList$!: Observable<Label[]>;
  selectedLabels: Label[] = [];

  items: MenuItem[] = [
    {
      label: 'Выбор книги',
    },
    {
      label: 'Информация о конспекте',
    },
    {
      label: 'Подтверждение',
    },
  ];

  today = new Date();
  username: string = '';

  constructor(
    private booksService: BooksService,
    private summariesService: SummariesService,
    private labelsService: LabelsService,
    public oidcSecurityService: OidcSecurityService,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.username = this.oidcSecurityService.getUserData()?.name;
  }

  loadBooks(event: any) {
    if (this.searchTitle === null || this.searchTitle.trim() === '') return;

    this.isLoading = true;
    let page = event.first / this.defaultPageSize + 1;

    this.bookList$ = this.booksService
      .getBooksByTitle(this.searchTitle, page, this.defaultPageSize)
      .pipe(
        tap((_) => {
          this.isLoading = false;
        })
      );

    this.cdref.detectChanges();
  }

  selectBook(book: BookInfo) {
    this.selectedBook = book;
    this.activePage = 1;

    this.labelsList$ = this.labelsService.getLabels();
  }

  removeLabel(id: number) {
    this.selectedLabels = this.selectedLabels.filter(
      (label) => label.id !== id
    );
  }

  makeSummary() {
    this.summary = {
      about: this.aboutSummary,
      labels: this.selectedLabels.map((l) => l.id),
      bookId: this.selectedBook!.id,
    };
    this.activePage = 2;
  }

  createSummary() {
    this.summariesService.addSummary(this.summary).subscribe(
      (response) => {
        this.router.navigate(['/summary', response]);

        this.messageService.add({
          severity: 'success',
          summary: 'Конспект добавлен',
          detail: 'Новый конспект успешно добавлен!',
        });
      },
      () => {
        this.router.navigate(['/library']);

        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'При добавлении конспекта произошла ошибка.',
        });
      }
    );
  }
}
