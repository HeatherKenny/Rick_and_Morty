import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1, name: string = ''): Observable<ApiResponse<Character>> {
    const params: any = { page: page.toString() };
    if (name) {
      params.name = name;
    }
    return this.http.get<ApiResponse<Character>>(`${this.BASE_URL}/character`, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.BASE_URL}/character/${id}`);
  }

  getLocations(page: number = 1, name: string = ''): Observable<ApiResponse<Location>> {
    const params: any = { page: page.toString() };
    if (name) {
      params.name = name;
    }
    return this.http.get<ApiResponse<Location>>(`${this.BASE_URL}/location`, { params });
  }

  getEpisodes(page: number = 1, name: string = ''): Observable<ApiResponse<Episode>> {
    const params: any = { page: page.toString() };
    if (name) {
      params.name = name;
    }
    return this.http.get<ApiResponse<Episode>>(`${this.BASE_URL}/episode`, { params });
  }
}
