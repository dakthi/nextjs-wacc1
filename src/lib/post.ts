import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm'; // <- ADD THIS

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
}

type Post = {
  slug: string;
  title: string;
  content: string;
  image?: string;
  date?: string;
  readingTime?: number;
  category?: string;
  quote?: string;
  client?: {
    name: string;
    age: number;
    job: string;
    image: string;
  };
  expert?: {
    name: string;
    title: string;
    image: string;
  };
};

type Frontmatter = Omit<Post, 'slug' | 'content'>;

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const parsed = matter(fileContents);
  const { data, content } = parsed;

  // Type guard: basic required field check
  if (typeof data.title !== 'string') {
    throw new Error(`Post "${slug}" is missing a valid "title" in its frontmatter.`);
  }

  // Convert markdown to HTML, WITH GFM support (tables, strikethrough, task lists, etc.)
  const processedContent = await remark()
    .use(remarkGfm)  // <-- ADD THIS
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug: realSlug,
    content: contentHtml,
    title: data.title,
    image: data.image,
    date: data.date,
    readingTime: data.readingTime,
    category: data.category,
    quote: data.quote,
    client: data.client,
    expert: data.expert,
  };
}
