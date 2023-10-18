import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientConfiguration, DefaultClientConfiguration } from './client-configuration';

@Injectable({
  providedIn: 'root'
})
export class ClientConfigurationService {
  private readonly _clientConfiguration = new BehaviorSubject<ClientConfiguration>(new DefaultClientConfiguration());
  readonly config$ = this._clientConfiguration.asObservable();

  constructor() { }

  private _setConfiguration(config: ClientConfiguration): void {
    this._clientConfiguration.next(config);
  }

  getConfiguration(): ClientConfiguration {
    return this._clientConfiguration.getValue();
  }

  resetConfiguration(): void {
    this._setConfiguration(new ClientConfiguration());
  }

  setCredentials(user:string, pass:string): void {
    console.log({'setCredentials user': user, 'pass': pass});
    const config = this.getConfiguration();
    config.fedoraUsername = user;
    config.fedoraPassword = pass;
    this._setConfiguration(config);
  }
  setBaseUrl(url:string): void {
    console.log({'setBaseUrl url': url});
    if (!url.endsWith('/')) {
      url += '/';
    }
    const config = this.getConfiguration();
    config.fedoraBaseUrl = url;
    this._setConfiguration(config);
  }
}
