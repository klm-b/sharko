import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataView } from 'primeng/dataview';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book/book';
import { Category } from 'src/app/core/models/book/category';
import { PaginatedBookList } from 'src/app/core/models/book/paginated-book-list';
import { BooksService } from 'src/app/core/services/books/books.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private cdref: ChangeDetectorRef,
    private location: Location
  ) {}

  defaultPageSize: number = 10;
  firstRow: number = 0;

  isLoading: boolean = false;

  bookList$!: Observable<PaginatedBookList>;

  categories$!: Observable<Category[]>;

  selectedCatagory?: string;

  @ViewChild(DataView)
  dataView?: DataView;

  ngOnInit() {
    let allCategory = {
      name: 'Все книги',
      icon: 'pi pi-bars',
      key: 'all',
    };

    this.categories$ = this.categoriesService.getCategories().pipe(
      map((c) => {
        if (c.filter((b) => b.key === 'all').length < 1) c.unshift(allCategory);
        return c;
      })
    );

    this.activatedRoute.paramMap.subscribe((params) => {
      this.selectedCatagory = params.get('category') ?? 'all';
      let page = Number(params.get('page') ?? 1);
      this.firstRow = (page - 1) * this.defaultPageSize;

      this.dataView?.paginate({
        first: this.firstRow,
        rows: this.defaultPageSize,
      });
    });
  }

  loadData(event: any) {
    this.isLoading = true;
    let page = event.first / this.defaultPageSize + 1;
    let url = this.router
      .createUrlTree(['/library', this.selectedCatagory, page])
      .toString();

    this.bookList$ = this.booksService
      .getBooks(page, this.defaultPageSize, this.selectedCatagory)
      .pipe(
        tap((_) => {
          this.isLoading = false;
          this.location.replaceState(url);
        })
      );

    this.cdref.detectChanges();
  }
}
