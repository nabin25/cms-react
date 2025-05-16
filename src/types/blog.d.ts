export interface IBlog {
  title: string;
  id: string;
  category_id: string;
  author_id: string;
  tags: string;
  category: string;
  author: string;
  created_at: Date;
  content: string;
  cover_image: string;
  status: "Published" | "Drafted";
}
