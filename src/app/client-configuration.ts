export interface IClientConfiguration {
    fedoraBaseUrl: string;
    fedoraUsername: string;
    fedoraPassword: string;
}

export class ClientConfiguration implements IClientConfiguration {
    fedoraBaseUrl: string = '';
    fedoraUsername: string = '';
    fedoraPassword: string = '';

    constructor() {}

    getBaseUrl(): string {
        return this.fedoraBaseUrl;
    }
    getUsername(): string {
        return this.fedoraUsername;
    }
    getPassword(): string {
        return this.fedoraPassword;
    }
}

export class DefaultClientConfiguration extends ClientConfiguration {
    constructor() {
        super();
        this.fedoraBaseUrl = 'http://localhost:8080/rest/';
        this.fedoraUsername = 'fedoraAdmin';
        this.fedoraPassword = 'fedoraAdmin';
    }
}
