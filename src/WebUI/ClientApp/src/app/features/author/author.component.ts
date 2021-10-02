import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Author } from 'src/app/core/models/author/author';
import { AuthorsService } from 'src/app/core/services/authors/authors.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authorsService: AuthorsService
  ) {}

  author$!: Observable<Author>;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.author$ = this.authorsService.getAuthor(Number(params.get('id')));
    });
  }
}
