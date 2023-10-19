export interface IFedoraResource {
    id: string;
    type: string[];
}

export const LDP_PREFIX: string = 'http://www.w3.org/ns/ldp#';

export const LDP_NON_RDF_RESOURCE: string = LDP_PREFIX + 'NonRDFSource';

export class FedoraResource implements IFedoraResource {
    id: string = '';
    type: string[] = [];
    createdDate: Date = new Date();
    createdBy: string = '';
    lastModifiedDate: Date = new Date();
    lastModifiedBy: string = '';
    contains: string[] = [];
    triples: string[][] = [];

    constructor(resource: any) {
        this.id = resource['@id'] || '';
        this.type = resource['@type'] || [];
        if (resource['http://fedora.info/definitions/v4/repository#created'] != undefined) {
            this.createdDate = new Date(Date.parse(resource['http://fedora.info/definitions/v4/repository#created'][0]['@value']));
        }
        if (resource['http://fedora.info/definitions/v4/repository#createdBy'] != undefined) {
            this.createdBy = resource['http://fedora.info/definitions/v4/repository#createdBy']['@id'];
        }
        if (resource['http://fedora.info/definitions/v4/repository#lastModified'] != undefined) {
            this.lastModifiedDate = new Date(Date.parse(resource['http://fedora.info/definitions/v4/repository#lastModified'][0]['@value']));
        }
        if (resource['http://fedora.info/definitions/v4/repository#lastModifiedBy'] != undefined) {
            this.lastModifiedBy = resource['http://fedora.info/definitions/v4/repository#lastModifiedBy']['@id'];
        }
        if (resource['http://www.w3.org/ns/ldp#contains'] != undefined) {
            for (let i = 0; i < resource['http://www.w3.org/ns/ldp#contains'].length; i++) {
                this.contains.push(resource['http://www.w3.org/ns/ldp#contains'][i]['@id']);
            }
        }
    }

    getId(): string {
        return this.id;
    }
    setId(id: string): void {
        this.id = id;
    }
    getType(): string[] {
        return this.type || [];
    }
    setType(type: string[]): void {
        this.type = type;
    }
    getCreatedDate(): Date {
        return this.createdDate || new Date();
    }
    setCreatedDate(createdDate: Date): void {
        this.createdDate = createdDate;
    }
    setCreatedDateFromString(createdDate: string): void {
        this.createdDate = new Date(createdDate);
    }
    getCreatedBy(): string {
        return this.createdBy;
    }
    setCreatedBy(createdBy: string): void {
        this.createdBy = createdBy;
    }
    getLastModifiedDate(): Date {
        return this.lastModifiedDate;
    }
    setLastModifiedDate(updatedDate: Date): void {
        this.lastModifiedDate = updatedDate;
    }
    setLastModifiedDateFromString(updatedDate: string): void {
        this.lastModifiedDate = new Date(updatedDate);
    }
    getLastModifiedBy(): string {
        return this.lastModifiedBy;
    }
    setUpdatedBy(updatedBy: string): void {
        this.lastModifiedBy = updatedBy;
    }
    getContains(): string[] {
        return this.contains || [];
    }
    getContainsCount(): number {
        return this.getContains().length;
    }
    setContains(contains: string[]): void {
        this.contains = contains;
    }
    getTriples(): string[][] {
        return this.triples || [];
    }
    setTriples(triples: string[][]): void {
        this.triples = triples;
    }
}

export class FedoraBinary implements IFedoraResource {
    id: string = '';
    type: string[] = [];
    metadata: FedoraResource | undefined;

    constructor(resource: any) {
        this.id = resource['@id'] || '';
        this.type = resource['@type'] || [];
    }
}
