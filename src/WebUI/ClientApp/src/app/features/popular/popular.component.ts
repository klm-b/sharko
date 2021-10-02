import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PaginatedSummaryList } from 'src/app/core/models/summary/paginated-summary-list';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { SummariesService } from 'src/app/core/services/summaries/summaries.service';
import { PluralForm } from 'src/app/core/utils/plural-form';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  constructor(
    private summariesService: SummariesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private cdref: ChangeDetectorRef
  ) {}

  getPluralForm = PluralForm.getPluralForm;

  @Input()
  public username!: string;

  defaultPageSize: number = 5;
  firstRow: number = 0;
  isLoading: boolean = false;

  sortOptions!: SelectItem[];

  orderOptions!: any[];
  sortOrder: string = 'desc';
  sortField: string = 'rating';

  summariesList$!: Observable<PaginatedSummaryList>;

  @ViewChild(DataView)
  dataView?: DataView;

  ngOnInit() {
    this.sortOptions = [
      { label: 'даты добавления', value: 'createdAt' },
      { label: 'количества лайков', value: 'rating' },
    ];

    this.orderOptions = [
      { label: 'По убыванию', value: 'desc' },
      { label: 'По возрастанию', value: 'asc' },
    ];
  }

  onSortChange(event: any): void {
    this.sortField = event.value;
    this.dataView?.paginate({
      first: this.firstRow,
      rows: this.defaultPageSize,
    });
  }

  onOrderChange(event: any) {
    this.dataView?.paginate({
      first: this.firstRow,
      rows: this.defaultPageSize,
    });
  }

  loadData(event: any) {
    this.isLoading = true;
    let page = event.first / this.defaultPageSize + 1;

    this.summariesList$ = this.summariesService
      .getSummaries(this.sortField, this.sortOrder, page, this.defaultPageSize)
      .pipe(
        tap((_) => {
          this.isLoading = false;
        })
      );

    this.cdref.detectChanges();
  }
}
