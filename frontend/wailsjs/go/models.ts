export namespace api {
	
	export class Client {
	    id: number;
	    firstName: string;
	    lastName: string;
	    fathersName: string;
	    title: string;
	    ipn: string;
	    address: string;
	    account: string;
	    phone: string;
	
	    static createFrom(source: any = {}) {
	        return new Client(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.firstName = source["firstName"];
	        this.lastName = source["lastName"];
	        this.fathersName = source["fathersName"];
	        this.title = source["title"];
	        this.ipn = source["ipn"];
	        this.address = source["address"];
	        this.account = source["account"];
	        this.phone = source["phone"];
	    }
	}
	export class CreateClientParams {
	    firstName: string;
	    lastName: string;
	    fathersName: string;
	    title: string;
	    ipn: string;
	    address: string;
	    account: string;
	    phone: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateClientParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.firstName = source["firstName"];
	        this.lastName = source["lastName"];
	        this.fathersName = source["fathersName"];
	        this.title = source["title"];
	        this.ipn = source["ipn"];
	        this.address = source["address"];
	        this.account = source["account"];
	        this.phone = source["phone"];
	    }
	}
	export class CreateDocTransaction {
	    documentId: number;
	    amount: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateDocTransaction(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.documentId = source["documentId"];
	        this.amount = source["amount"];
	    }
	}
	export class CreateDocumentParams {
	    executorId: number;
	    contractorId: number;
	    date: string;
	    title: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateDocumentParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.executorId = source["executorId"];
	        this.contractorId = source["contractorId"];
	        this.date = source["date"];
	        this.title = source["title"];
	    }
	}
	export class DocTransaction {
	    id: number;
	    documentId: number;
	    amount: string;
	
	    static createFrom(source: any = {}) {
	        return new DocTransaction(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.documentId = source["documentId"];
	        this.amount = source["amount"];
	    }
	}
	export class Document {
	    id: number;
	    executor: Client;
	    contractor: Client;
	    date: string;
	    title: string;
	    transactions: DocTransaction[];
	
	    static createFrom(source: any = {}) {
	        return new Document(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.executor = this.convertValues(source["executor"], Client);
	        this.contractor = this.convertValues(source["contractor"], Client);
	        this.date = source["date"];
	        this.title = source["title"];
	        this.transactions = this.convertValues(source["transactions"], DocTransaction);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class UpdateClientByIDParams {
	    id: number;
	    firstName: string;
	    lastName: string;
	    fathersName: string;
	    title: string;
	    ipn: string;
	    address: string;
	    account: string;
	    phone: string;
	
	    static createFrom(source: any = {}) {
	        return new UpdateClientByIDParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.firstName = source["firstName"];
	        this.lastName = source["lastName"];
	        this.fathersName = source["fathersName"];
	        this.title = source["title"];
	        this.ipn = source["ipn"];
	        this.address = source["address"];
	        this.account = source["account"];
	        this.phone = source["phone"];
	    }
	}

}

