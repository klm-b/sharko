import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/core/models/chapter/chapter';
import { ChaptersService } from 'src/app/core/services/chapters/chapters.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
})
export class ReaderComponent implements OnInit {
  constructor(
    private chaptersService: ChaptersService,
    private activatedRoute: ActivatedRoute
  ) {}

  chapter$!: Observable<Chapter>;
  chapters$!: Observable<Chapter[]>;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.chapter$ = this.chaptersService.getChapter(
        Number(params.get('id')),
        Number(params.get('chapter'))
      );

      this.chapters$ = this.chaptersService.getChapters(
        Number(params.get('id'))
      );
    });
  }
}
