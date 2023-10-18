import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { FedoraResource } from './fedora-resource';
import { ClientConfiguration } from './client-configuration';
import { ClientConfigurationService } from './client-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class FedoraClientService {

  httpClient: HttpClient;
  basicAuthHeader?: string;
  configService: ClientConfigurationService;

  constructor(private http: HttpClient, private config: ClientConfigurationService) {
    this.httpClient = http;
    this.configService = config;
    config.config$.subscribe((config: ClientConfiguration) => {
      console.log("Update Basic auth header");
      this.basicAuthHeader = 'Basic ' + btoa(config.fedoraUsername + ':' + config.fedoraPassword);
    });
  }

  // Implement Fedora API https://fedora.info/2021/05/01/spec/ calls here

  private _addHostToUrl(url: string): string {
    if (!(url.startsWith('http')||url.startsWith('https'))) {
      const fedoraBaseUrl = this.configService.getConfiguration().getBaseUrl();
      url = fedoraBaseUrl + url;
    }
    return url;
  }

  getRecord(url: string): Observable<HttpResponse<FedoraResource>|HttpErrorResponse> {
    const headers = new HttpHeaders({
      'Accept': 'application/ld+json',
    });
    if (this.basicAuthHeader != undefined) {
      headers.append('Authorization', this.basicAuthHeader);
    }
    return this.httpClient.get<FedoraResource>(this._addHostToUrl(url), {
      headers: headers,
      observe: 'response',
      withCredentials: (this.basicAuthHeader != undefined)
    }).pipe(catchError((err: HttpErrorResponse) => of(err)));
  }

  patchRecord(url: string, body: string): Observable<HttpResponse<any>|HttpErrorResponse> {
    
      const headers = new HttpHeaders({
        'Accept': 'application/ld+json',
        'Content-Type': 'application/sparql-update'
      });
      if (this.basicAuthHeader != undefined) {
        headers.append('Authorization', this.basicAuthHeader);
      }
      return this.httpClient.patch<any>(this._addHostToUrl(url), body, {
        headers: headers,
        observe: 'response'
      }).pipe(catchError((err: HttpErrorResponse) => of(err)));
  }

  deleteRecord(url: string): Observable<HttpResponse<any>|HttpErrorResponse> {
    const headers = new HttpHeaders();
    if (this.basicAuthHeader != undefined) {
      headers.append('Authorization', this.basicAuthHeader);
    }
    return this.httpClient.delete(url, {
      headers: headers,
      observe: 'response'
    }).pipe(catchError((err: HttpErrorResponse) => of(err)));
  }

  createRecordAtPath(url: string, body: string, content_type: string): Observable<HttpResponse<string>|HttpErrorResponse> {
    const headers = new HttpHeaders({
      'Content-Type': content_type
    });
    if (this.basicAuthHeader != undefined) {
      headers.append('Authorization', this.basicAuthHeader);
    }
    return this.httpClient.put<string>(this._addHostToUrl(url), body, {
      headers: headers,
      observe: 'response'
    }).pipe(catchError((err: HttpErrorResponse) => of(err)));
  }

  createRecordAtParent(parentUrl: string, body: string, content_type: string, slug?: string): Observable<HttpResponse<string>|HttpErrorResponse> {
    const headers = new HttpHeaders({
      'Content-Type': content_type
    });
    if (slug != undefined) {
      headers.append('Slug', slug);
    }
    if (this.basicAuthHeader != undefined) {
      headers.append('Authorization', this.basicAuthHeader);
    }
    return this.httpClient.post<string>(this._addHostToUrl(parentUrl), body, {
      headers: headers,
      observe: 'response'
    }).pipe(catchError((err: HttpErrorResponse) => of(err)));
  }

  headUrl(url: string): Observable<HttpResponse<any>|HttpErrorResponse> {
    const headers = new HttpHeaders();
    if (this.basicAuthHeader != undefined) {
      headers.append('Authorization', this.basicAuthHeader);
    }
    console.log({'headers': headers, 'url': url});
    return this.httpClient.head(this._addHostToUrl(url), {
      headers: headers,
      observe: 'response',
      withCredentials: (this.basicAuthHeader != undefined)
    }).pipe(catchError((err: HttpErrorResponse) => of(err)));
  }


}
