import { baseUrl } from './routes';

export class BlogsRoutes {
  static get add(): string {
    return `${baseUrl}/blogs/add-blog`;
  }

  static get list(): string {
    return `${baseUrl}/blogs/blog`;
  }

  static get details(): string {
    return `${baseUrl}/blogs/blog-details`;
  }

  static get edit(): string {
    return `${baseUrl}/blogs/edit-blog`;
  }
}
