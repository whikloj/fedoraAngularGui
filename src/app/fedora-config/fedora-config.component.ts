import { Component } from '@angular/core';
import { ClientConfiguration } from '../client-configuration';
import { ClientConfigurationService } from '../client-configuration.service';
import { FedoraClientService } from '../fedora-client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fedora-config',
  templateUrl: './fedora-config.component.html',
  styleUrls: ['./fedora-config.component.scss']
})
export class FedoraConfigComponent {
  
  clientConfiguration!: ClientConfiguration;
  configService: ClientConfigurationService;
  fedoraClient: FedoraClientService;
  router: Router

  configForm = new FormGroup({
    fedoraBaseUrl: new FormControl('', Validators.required),
    fedoraUsername: new FormControl(''),
    fedoraPassword: new FormControl(''),
  })

  constructor(
    private cs: ClientConfigurationService,
    private fc: FedoraClientService,
    private r: Router) { 
    cs.config$.subscribe((config: ClientConfiguration) => {
      console.log("Update client configuration");
      this.clientConfiguration = config
      this.configForm.controls['fedoraBaseUrl'].setValue(this.clientConfiguration.fedoraBaseUrl);
      this.configForm.controls['fedoraUsername'].setValue(this.clientConfiguration.fedoraUsername);
      this.configForm.controls['fedoraPassword'].setValue(this.clientConfiguration.fedoraPassword);
    });
    this.configService = cs;
    this.fedoraClient = fc;
    this.router = r;
  }

  submitConfig(theForm: any): void {
    console.log({'theform': theForm});
    if (!theForm.valid) {
      return;
    }
    if (theForm.value.fedoraUsername.trim().length > 0 || theForm.value.fedoraPassword.trim().length > 0) {
      if (theForm.value.fedoraUsername.trim().length == 0 || theForm.value.fedoraPassword.trim().length == 0) {
        if (theForm.value.fedoraUsername.trim().length == 0) {
          this.configForm.controls['fedoraUsername'].setErrors({'required': true});
          return;
        } else {
          this.configForm.controls['fedoraPassword'].setErrors({'required': true});
          return;
        }
      }
      this.configService.setCredentials(theForm.value.fedoraUsername.trim(), theForm.value.fedoraPassword.trim());
    }
    if (theForm.value.fedoraBaseUrl.trim().length > 0) {
      const baseUrl = theForm.value.fedoraBaseUrl.trim();
      this.fedoraClient.headUrl(baseUrl).subscribe((response: HttpResponse<any>|HttpErrorResponse) => {
        console.log({'response': response});
        if (response.ok) {
          this.clientConfiguration.fedoraBaseUrl = baseUrl;
          this.configService.setBaseUrl(this.clientConfiguration.fedoraBaseUrl);
          this.configForm.controls['fedoraBaseUrl'].setErrors(null);
          this.router.navigate(['/']);
        } else if (response.status == 401) {
          this.configForm.controls['fedoraBaseUrl'].setErrors({'unauthorized': true});
        } else {
          this.configForm.controls['fedoraBaseUrl'].setErrors({'invalid': true});
        }
      });
    }
  }
}
