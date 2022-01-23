export class PaginationResponse<T> {
  totalItems: number;
  pages: number;
  position: number;
  pageSize: number;
  currentPage: number;
  data: T[];
}
