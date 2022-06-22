import { OnDestroy, Output, EventEmitter, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseComponentOnDestroy implements OnDestroy {
  isDestroyed$ = new Subject<boolean>();
  @Output() outputEvent = new EventEmitter();

  ngOnDestroy() {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

}
