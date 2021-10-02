import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatedBookList } from 'src/app/core/models/book/paginated-book-list';
import { BooksService } from 'src/app/core/services/books/books.service';
import { DataView } from 'primeng/dataview';
import { tap } from 'rxjs/operators';
import { query } from '@angular/animations';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {}

  searchTitle = '';
  bookList$!: Observable<PaginatedBookList>;

  defaultPageSize: number = 10;
  firstRow: number = 0;

  isLoading: boolean = false;

  items!: MenuItem[];

  @ViewChild(DataView)
  dataView?: DataView;

  ngOnInit() {
    this.items = this.getMenuItems(false);

    this.activatedRoute.paramMap.subscribe((params) => {
      this.searchTitle = params.get('query') ?? '';

      this.bookList$ = this.booksService.getBooksByTitle(this.searchTitle, 1);

      this.dataView?.paginate({
        first: this.firstRow,
        rows: this.defaultPageSize,
      });
    });
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

  getMenuItems(isProfileOwner: boolean) {
    return [
      {
        label: 'Книги',
        icon: 'pi pi-fw pi-book',
      },
      {
        label: 'Конспекты',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Пользователи',
        icon: 'pi pi-fw pi-user',
        command: () => this.router.navigate(['/user', this.searchTitle]),
      },
    ];
  }
}
