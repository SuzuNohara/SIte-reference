export class CICMDB {
    id: string;
    name: string;
    company: string;
    dataset: string;
    ciType: string;
    relationType: string;
    relation: CICMDB;

    constructor(){
        this.id = '';
        this.name = '';
        this.company = '';
        this.dataset = '';
        this.ciType = '';
        this.relationType = '';
    }
}
