export class PaginationResponse<T> {
  totalItems: number;
  position: number;
  pageSize: number;
  currentPage: number;
  data: T[];
}
