import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(protected http: HttpClient) { }

  protected getApiUrl(): string {
    return environment.baseApiUrl;
  }

  getAll(): Observable<any> {
    return this.http.get(this.getApiUrl() + '?offset=0&limit=1279');
  }

  get(name: string): Observable<any> {
    return this.http.get(this.getApiUrl() + name);
  }

  getInfoPokemon(url: string) {
    return this.http.get(url);
  }
}
