import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTerm = signal<string>('');
  private searchSubject = new Subject<string>();
  
  searchObservable$ = this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  constructor() {
    this.searchObservable$.subscribe(term => {
      this.searchTerm.set(term);
    });
  }

  updateSearch(term: string): void {
    this.searchSubject.next(term);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.searchSubject.next('');
  }
}
