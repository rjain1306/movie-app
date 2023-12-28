export class PagedCollection<Entity> {
  currentPageNumber: number;
  recordsPerPage: number;
  totalRecords: number;
  totalPages: number;
  items: (Entity | [])[];

  constructor(
    recordsToSkip: number,
    recordsPerPage: number,
    totalRecords: number,
    items: (Entity | [])[],
  ) {
    this.items = items;
    // eslint-disable-next-line radix
    this.recordsPerPage = parseInt(recordsPerPage.toString());
    this.totalRecords = totalRecords;
    this.currentPageNumber = this.getCurrentPageNumber(
      recordsToSkip,
      recordsPerPage,
    );
    this.totalPages = this.getTotalPages();
  }

  private getCurrentPageNumber(skip: number, pageNumber: number): number {
    let recordsPerPage = pageNumber;
    if (recordsPerPage > 0) {
      return Math.floor(skip / recordsPerPage) + 1;
    }

    recordsPerPage = 25;
    return Math.floor(skip / recordsPerPage) + 1;
  }

  private getTotalPages(): number {
    if (this.recordsPerPage > 0) {
      return Math.floor(
        (this.totalRecords + this.recordsPerPage - 1) / this.recordsPerPage,
      );
    }

    return 1;
  }
}
