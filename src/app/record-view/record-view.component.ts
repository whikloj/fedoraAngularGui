import { Component, Input } from '@angular/core';
import { FedoraResource, LDP_NON_RDF_RESOURCE } from '../fedora-resource';
import { FedoraClientService } from '../fedora-client.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss']
})
export class RecordViewComponent {
  @Input() path: string | undefined;
  record: FedoraResource | undefined;
  errorMessage: string = '';
  fedoraClient: FedoraClientService;
  private readonly defaultPath = '';

  constructor(private fc: FedoraClientService, private router: ActivatedRoute) {
    this.fedoraClient = fc;
    this.router.paramMap.subscribe(params => {
      const path = params.get('path');
      if (path != null) {
        this._loadRecord(decodeURIComponent(path));
      }
    });
  }

  ngOnInit(): void {
    const decoded_path = decodeURIComponent(this.path || this.defaultPath);
    console.log({'path': decoded_path});
    this._loadRecord(decoded_path);
  }

  private _loadRecord(decoded_path: string): void {
    let isBinary: boolean = false;
    this.fedoraClient.headUrl(decoded_path).subscribe((response: HttpResponse<any>|HttpErrorResponse) => {
      if (response instanceof HttpErrorResponse) {
        console.log({'error': response.error});
        this.errorMessage = response.error;
      } else if (response.status == 200) {
        if (response.headers.has('Link')) {
          const linkHeader: string[] = response.headers.getAll('Link') || [];
          for (let link of linkHeader) {
            const links: string[][] = this.fedoraClient.decodeLinkHeaders(link);
            isBinary = links.some((link: string[]) => {
              if (link[0] == 'type' && link[1] == LDP_NON_RDF_RESOURCE) {
                return true;
              }
              return false;
            });
          }
        }
      }
      this.fedoraClient.getRecord(decoded_path, isBinary).subscribe((response: HttpResponse<FedoraResource>|HttpErrorResponse) => {
        if (response instanceof HttpErrorResponse) {
          console.log({'error': response.error});
          this.errorMessage = response.error;
        } else if (response.status == 200 && response.body != undefined) {
          if (response.body instanceof Array && response.body.length > 0) {
            this.record = new FedoraResource(response.body[0]);
            console.log({'record': this.record});
          }
        } else {
          this.record = undefined;
        }
      });
    });
  }
}
