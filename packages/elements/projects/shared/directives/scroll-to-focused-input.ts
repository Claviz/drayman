import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, of } from 'rxjs';
import { debounceTime, catchError, tap, distinctUntilChanged } from 'rxjs/operators';

@Directive({
    selector: '[draymanScrollToFocusedInput]'
})
export class ScrollToFocusedInputDirective implements AfterViewInit, OnDestroy {
    focus$: Subscription;

    constructor(private elRef: ElementRef) { }

    ngAfterViewInit() {
        this.focus$ = fromEvent<Event>(this.elRef.nativeElement, 'focusin').pipe(
            debounceTime(250),
            tap(xx => {
                (xx.target as any).scrollIntoView({
                    block: 'center',
                    inline: 'center',
                    behavior: 'smooth',
                });
            }),
            catchError((err, o) => o),
        ).subscribe();
    }

    ngOnDestroy() {
        this.focus$.unsubscribe();
    }
}
