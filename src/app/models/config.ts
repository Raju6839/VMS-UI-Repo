export class Config {
    id?:any;
    itemsPerPage?: number;
    currentPage?: number;
    totalItems?: number;
    constructor(itemsPerPage?: number,
        currentPage?: number,
        totalItems?: number) {
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
    }
}