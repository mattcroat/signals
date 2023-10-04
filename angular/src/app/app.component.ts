import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="increment()">
      {{ doubleCount() }}
    </button>
  `,
})
export class AppComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update((count) => count + 1);
  }

  constructor() {
    effect(() => {
      console.log(this.doubleCount());
    });
  }
}
