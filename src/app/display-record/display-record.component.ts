import { Component, Input } from '@angular/core';
import { FedoraClientService } from '../fedora-client.service';
import { FedoraResource } from '../fedora-resource';
import { ClientConfiguration } from '../client-configuration';
import { ClientConfigurationService } from '../client-configuration.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-record',
  templateUrl: './display-record.component.html',
  styleUrls: ['./display-record.component.scss']
})
export class DisplayRecordComponent {
  client: FedoraClientService;
  @Input() record: FedoraResource | undefined;
  config: ClientConfigurationService
  fedoraBaseUrl: string;
  

  constructor(
    private fc: FedoraClientService,
    private cs: ClientConfigurationService,
    private route: ActivatedRoute  
  ) {
    this.client = fc;
    this.config = cs;
    this.fedoraBaseUrl = this.config.getConfiguration().getBaseUrl();
  }

  generateBreadcrumb(path: string): string[][] {
    if (path.startsWith(this.fedoraBaseUrl)) {
      path = path.substring(this.fedoraBaseUrl.length);
    }
    const pathParts :string[] = path.split('/');
    let breadcrumb: string[][] = [];
    for (let i = 0; i < pathParts.length; i++) {
      const uri: string = path.substring(path.lastIndexOf('/', i));
      if (pathParts[i].length > 0) {
        breadcrumb.push([ pathParts[i], uri ] );
      }
    }
    return breadcrumb;
  }

  makeEncodedUri(uri: string): string {
    if (uri.startsWith(this.fedoraBaseUrl)) {
      uri = uri.substring(this.fedoraBaseUrl.length);
    }
    uri = encodeURIComponent(uri);
    return uri;
  }
}
