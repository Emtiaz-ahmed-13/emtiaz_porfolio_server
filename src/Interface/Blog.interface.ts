export interface IBlog extends Document {
  slug: string;
  image: string;
  title: string;
  summary?: string;
  content: string;
  tags: string[];
  readTime?: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
