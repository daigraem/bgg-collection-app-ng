import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';

@Component({
  selector: 'app-input-debounce',
  templateUrl: './input-debounce.component.html',
  styleUrls: ['./input-debounce.component.scss'],
})
export class InputDebounceComponent implements OnInit {
  @Input() placeholder: string;
  @Input() delay = 300;
  @Input() minLength = 1;
  @Output() value: EventEmitter<string> = new EventEmitter<string>();

  public inputValue: string;

  constructor(private elementRef: ElementRef) {
    fromEvent(this.elementRef.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter((res) => res.length > this.minLength || !res),
        debounceTime(this.delay),
        distinctUntilChanged()
      )
      .subscribe((input) => this.value.emit(input));
  }

  ngOnInit(): void {}
}
