import { ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, skip } from 'rxjs/operators';
import { DocumentEventsService } from '../services/utils/document-events.service';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Output() appClickOutside = new EventEmitter<void>();
  @Input() appClickOutsideSkipCount: number = 0;
  private subscription!: Subscription;

  constructor(
    private documentEventsService: DocumentEventsService,
    private eleRef: ElementRef
  ) {}

  ngOnInit() {
    this.subscription = this.documentEventsService.documentClickedTarget
      .pipe(skip(this.appClickOutsideSkipCount))
      .subscribe((target) => {
        if (!this.eleRef.nativeElement.contains(target)) {
          this.appClickOutside.emit();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
