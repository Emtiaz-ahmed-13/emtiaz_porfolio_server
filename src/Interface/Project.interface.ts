export interface IProject extends Document {
  title: string;
  image: string;
  description?: string;
  repoUrl?: string;
  liveUrl?: string;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
