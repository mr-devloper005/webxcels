import businessPost from '@/assets/business-post.jpg';
import techPost from '@/assets/tech-post.jpg';
import fashionPost from '@/assets/fashion-post.jpg';
import lifestylePost from '@/assets/lifestyle-post.jpg';
import workLifestyle from '@/assets/work-lifestyle.jpg';
import fashionLifestyle from '@/assets/fashion-lifestyle.jpg';

export type ContentType = 'article';

export interface ContentItem {
  id: string;
  slug: string;
  type: ContentType;
  title: string;
  category: string;
  subcategory?: string;
  date: string;
  excerpt: string;
  image: string;
  tags?: string[];
  author: string;
  /**
   * Optional ID of the authenticated user who created this article.
   * Present for user-written articles stored in localStorage.
   */
  authorId?: string;
  /**
   * Optional unformatted body text used for editing.
   * Present for user-written articles created after edit support was added.
   */
  rawContent?: string;
  readTime?: string;
  content?: string;
  createdAt?: string;
}

const STORAGE_KEY = 'webxcels-user-articles';

const baseContent: ContentItem[] = [
  {
    id: 'a1',
    slug: 'how-ai-is-reshaping-creative-workflows',
    type: 'article',
    title: 'How AI Is Reshaping Creative Workflows in 2025',
    category: 'TECHNOLOGY',
    subcategory: 'Artificial Intelligence',
    date: 'March 5, 2026',
    excerpt: 'From generative design to automated copywriting, AI tools are changing how creative teams work.',
    image: techPost,
    tags: ['AI', 'Creativity', 'Productivity', 'Design'],
    author: 'Kai Chen',
    readTime: '8 min read',
    content: '<p>AI is reshaping creative workflows by automating repetitive tasks and accelerating experimentation.</p><h2 class="text-xl font-bold text-foreground mb-4 mt-8">The New Creative Stack</h2><p>Modern teams combine generative tools with human judgment to move from idea to delivery faster.</p><ul class="list-disc pl-6 my-4"><li><strong>Ideation:</strong> rapid concept generation</li><li><strong>Design:</strong> layout and visual exploration</li><li><strong>Writing:</strong> draft acceleration and refinement</li></ul><h2 class="text-xl font-bold text-foreground mb-4 mt-8">The Human Edge</h2><p>Taste and strategy remain human strengths, and great teams use AI as an amplifier.</p>'
  },
  {
    id: 'a2',
    slug: 'building-a-sustainable-business-in-the-attention-economy',
    type: 'article',
    title: 'Building a Sustainable Business in the Attention Economy',
    category: 'BUSINESS',
    subcategory: 'Strategy',
    date: 'March 3, 2026',
    excerpt: 'The strongest companies focus on durable value, not short-term attention spikes.',
    image: businessPost,
    tags: ['Strategy', 'Sustainability', 'Growth', 'Entrepreneurship'],
    author: 'Priya Sharma',
    readTime: '7 min read',
    content: '<p>Attention is expensive. Sustainable companies invest in trust, utility, and long-term relationships.</p><h2 class="text-xl font-bold text-foreground mb-4 mt-8">Value First</h2><p>Build for real problems and let authentic demand follow.</p><ul class="list-disc pl-6 my-4"><li><strong>Solve real problems</strong></li><li><strong>Build trust through transparency</strong></li><li><strong>Create community</strong></li></ul>'
  },
  {
    id: 'a3',
    slug: 'the-new-rules-of-street-style',
    type: 'article',
    title: 'The New Rules of Street Style: Why Comfort Won Fashion',
    category: 'FASHION',
    subcategory: 'Street Style',
    date: 'February 28, 2026',
    excerpt: 'Comfort-forward fashion is now the dominant style language of the decade.',
    image: fashionPost,
    tags: ['Street Style', 'Fashion Trends', 'Comfort Wear'],
    author: 'Maya Rodriguez',
    readTime: '6 min read',
    content: '<p>Comfort and structure now co-exist, and the best outfits blend softness with intention.</p><h2 class="text-xl font-bold text-foreground mb-4 mt-8">Key Trends</h2><ul class="list-disc pl-6 my-4"><li>Technical fabrics in everyday wear</li><li>Relaxed tailoring</li><li>Statement sneakers</li></ul>'
  },
  {
    id: 'a4',
    slug: 'morning-routines-of-high-performers',
    type: 'article',
    title: 'Morning Routines of High Performers: What Actually Works',
    category: 'LIFESTYLE',
    subcategory: 'Wellness',
    date: 'February 25, 2026',
    excerpt: 'The best routines are consistent, simple, and built for long-term energy.',
    image: workLifestyle,
    tags: ['Wellness', 'Productivity', 'Habits', 'Morning Routine'],
    author: 'Alex Torres',
    readTime: '5 min read',
    content: '<p>Great mornings are less about hacks and more about repeatable habits.</p><h2 class="text-xl font-bold text-foreground mb-4 mt-8">Three Pillars</h2><ul class="list-disc pl-6 my-4"><li>Consistency over intensity</li><li>Movement before screens</li><li>One creative act</li></ul>'
  },
  {
    id: 'a5',
    slug: 'future-of-remote-collaboration',
    type: 'article',
    title: 'The Future of Remote Collaboration: Beyond Video Calls',
    category: 'BUSINESS',
    subcategory: 'Future of Work',
    date: 'February 20, 2026',
    excerpt: 'Async-first tools and AI assistants are reshaping how teams work together.',
    image: techPost,
    tags: ['Remote Work', 'Collaboration', 'Future of Work'],
    author: 'Kai Chen',
    readTime: '7 min read',
    content: '<p>Teams are moving from meetings to documentation and from sync to async.</p><h2 class="text-xl font-bold text-foreground mb-4 mt-8">What Is Next</h2><ul class="list-disc pl-6 my-4"><li>Async by default</li><li>Better decision logs</li><li>AI meeting support</li></ul>'
  },
  {
    id: 'a6',
    slug: 'designing-spaces-that-inspire-creativity',
    type: 'article',
    title: 'Designing Spaces That Inspire Creativity',
    category: 'DESIGN',
    subcategory: 'Interior Design',
    date: 'February 15, 2026',
    excerpt: 'The right physical space can boost creative output and focus.',
    image: fashionLifestyle,
    tags: ['Design', 'Workspace', 'Creativity', 'Interior Design'],
    author: 'Maya Rodriguez',
    readTime: '6 min read',
    content: '<p>Environment shapes behavior, and creative work thrives in spaces built for flow.</p><h2 class="text-xl font-bold text-foreground mb-4 mt-8">Design Principles</h2><ul class="list-disc pl-6 my-4"><li>Natural light</li><li>Biophilic elements</li><li>Distinct zones</li></ul>'
  },
  {
    id: 'p1',
    slug: 'inside-the-creator-economy-with-independent-founders',
    type: 'article',
    title: 'Podcast: Inside the Creator Economy with Independent Founders',
    category: 'PODCAST',
    subcategory: 'Creator Economy',
    date: 'March 1, 2026',
    excerpt: 'A conversation on monetization, audience trust, and long-term creator businesses.',
    image: lifestylePost,
    tags: ['Podcast', 'Creator Economy', 'Founders'],
    author: 'WebXcels Audio',
    readTime: '42 min listen',
    content: '<p>Independent founders share how they build stable creator businesses without shortcuts.</p>'
  },
  {
    id: 'p2',
    slug: 'design-leadership-lessons-from-product-teams',
    type: 'article',
    title: 'Podcast: Design Leadership Lessons from High-Performing Product Teams',
    category: 'PODCAST',
    subcategory: 'Design Leadership',
    date: 'February 24, 2026',
    excerpt: 'Design directors share rituals, critiques, and hiring frameworks.',
    image: fashionLifestyle,
    tags: ['Podcast', 'Design', 'Leadership'],
    author: 'WebXcels Audio',
    readTime: '37 min listen',
    content: '<p>Leadership systems, not individual heroics, define strong design teams.</p>'
  },
  {
    id: 'p3',
    slug: 'the-future-of-remote-collaboration-audio-roundtable',
    type: 'article',
    title: 'Podcast: The Future of Remote Collaboration (Audio Roundtable)',
    category: 'PODCAST',
    subcategory: 'Future of Work',
    date: 'February 19, 2026',
    excerpt: 'Operators discuss async workflows, decision logs, and communication quality.',
    image: workLifestyle,
    tags: ['Podcast', 'Remote Work', 'Collaboration'],
    author: 'WebXcels Audio',
    readTime: '45 min listen',
    content: '<p>Distributed teams are building habits that scale across time zones.</p>'
  },
  {
    id: 'a7',
    slug: 'scaling-a-bootstrapped-saas-to-seven-figures',
    type: 'article',
    title: 'Scaling a Bootstrapped SaaS to Seven Figures',
    category: 'BUSINESS',
    subcategory: 'Growth',
    date: 'February 10, 2026',
    excerpt: 'How small teams use focus and constraints to grow profitable SaaS companies.',
    image: businessPost,
    tags: ['SaaS', 'Bootstrapped', 'Growth'],
    author: 'Priya Sharma',
    readTime: '9 min read',
    content: '<p>Bootstrapped founders trade fundraising decks for focused execution and customer empathy.</p>'
  },
  {
    id: 'a8',
    slug: 'design-systems-that-dont-slow-teams-down',
    type: 'article',
    title: "Design Systems That Don&apos;t Slow Teams Down",
    category: 'DESIGN',
    subcategory: 'Design Systems',
    date: 'February 5, 2026',
    excerpt: 'High-velocity design systems are built for shipping, not just documentation.',
    image: techPost,
    tags: ['Design Systems', 'Product Design'],
    author: 'Maya Rodriguez',
    readTime: '8 min read',
    content: '<p>The best systems evolve with the product instead of trying to predict every component up front.</p>'
  },
  {
    id: 'a9',
    slug: 'using-ai-assistants-as-a-solo-founder',
    type: 'article',
    title: 'Using AI Assistants as a Solo Founder',
    category: 'TECHNOLOGY',
    subcategory: 'AI',
    date: 'January 30, 2026',
    excerpt: 'From research to customer support, AI gives solo founders real leverage.',
    image: techPost,
    tags: ['AI', 'Founders', 'Productivity'],
    author: 'Kai Chen',
    readTime: '7 min read',
    content: '<p>Solo founders are using AI to cover entire functional areas they can&apos;t yet hire for.</p>'
  },
  {
    id: 'a10',
    slug: 'quiet-marketing-strategies-that-compound',
    type: 'article',
    title: 'Quiet Marketing Strategies That Compound',
    category: 'BUSINESS',
    subcategory: 'Marketing',
    date: 'January 25, 2026',
    excerpt: 'Evergreen content and community-first tactics can outperform splashy campaigns.',
    image: workLifestyle,
    tags: ['Marketing', 'Content', 'Community'],
    author: 'Alex Torres',
    readTime: '6 min read',
    content: '<p>Compounding channels reward consistency and depth over short bursts of attention.</p>'
  },
  {
    id: 'a11',
    slug: 'capsule-wardrobes-for-remote-workers',
    type: 'article',
    title: 'Capsule Wardrobes for Remote Workers',
    category: 'FASHION',
    subcategory: 'Lifestyle',
    date: 'January 20, 2026',
    excerpt: 'A minimal wardrobe that still feels expressive and intentional.',
    image: fashionPost,
    tags: ['Fashion', 'Remote Work', 'Minimalism'],
    author: 'Maya Rodriguez',
    readTime: '5 min read',
    content: '<p>Clever layering and fabric choices can make a tiny wardrobe feel endlessly remixable.</p>'
  },
  {
    id: 'a12',
    slug: 'the-psychology-of-deep-work-in-open-offices',
    type: 'article',
    title: 'The Psychology of Deep Work in Open Offices',
    category: 'LIFESTYLE',
    subcategory: 'Work',
    date: 'January 15, 2026',
    excerpt: 'Attention is a finite resource—here is how to protect it in noisy environments.',
    image: workLifestyle,
    tags: ['Deep Work', 'Psychology', 'Productivity'],
    author: 'Alex Torres',
    readTime: '9 min read',
    content: '<p>Deep work requires friction: intentional boundaries, time blocks, and social norms.</p>'
  },
  {
    id: 'a13',
    slug: 'how-small-teams-ship-better-products',
    type: 'article',
    title: 'How Small Teams Ship Better Products',
    category: 'BUSINESS',
    subcategory: 'Teams',
    date: 'January 10, 2026',
    excerpt: 'Tiny, cross-functional teams can out-ship larger organizations.',
    image: businessPost,
    tags: ['Teams', 'Product', 'Startups'],
    author: 'Priya Sharma',
    readTime: '8 min read',
    content: '<p>Ownership, context, and direct customer contact give small teams an unfair advantage.</p>'
  },
  {
    id: 'a14',
    slug: 'human-centered-interfaces-in-an-ai-first-world',
    type: 'article',
    title: 'Human-Centered Interfaces in an AI-First World',
    category: 'TECHNOLOGY',
    subcategory: 'Product Design',
    date: 'January 5, 2026',
    excerpt: 'Interfaces need to stay legible even as AI handles more complexity under the hood.',
    image: techPost,
    tags: ['UX', 'AI', 'Interfaces'],
    author: 'Kai Chen',
    readTime: '10 min read',
    content: '<p>Great AI products expose confidence levels, allow overrides, and keep users in control.</p>'
  },
  {
    id: 'a15',
    slug: 'the-rise-of-neighborhood-maker-spaces',
    type: 'article',
    title: 'The Rise of Neighborhood Maker Spaces',
    category: 'LIFESTYLE',
    subcategory: 'Community',
    date: 'December 30, 2025',
    excerpt: 'Shared workshops are turning side projects into physical realities.',
    image: lifestylePost,
    tags: ['Makers', 'Community', 'Hardware'],
    author: 'Alex Torres',
    readTime: '6 min read',
    content: '<p>Access to tools—and peers—lowers the barrier between idea and prototype.</p>'
  },
  {
    id: 'a16',
    slug: 'why-branding-starts-with-operations',
    type: 'article',
    title: 'Why Branding Starts With Operations',
    category: 'BUSINESS',
    subcategory: 'Brand',
    date: 'December 22, 2025',
    excerpt: 'Your brand is what the ops team actually delivers, not what the deck says.',
    image: businessPost,
    tags: ['Brand', 'Operations'],
    author: 'Priya Sharma',
    readTime: '7 min read',
    content: '<p>Operational excellence is the substrate for any credible brand promise.</p>'
  },
  {
    id: 'a17',
    slug: 'color-palettes-that-age-gracefully',
    type: 'article',
    title: 'Color Palettes That Age Gracefully',
    category: 'DESIGN',
    subcategory: 'Visual Design',
    date: 'December 15, 2025',
    excerpt: 'Timeless palettes lean on contrast, not trend colors.',
    image: fashionLifestyle,
    tags: ['Color', 'Visual Design'],
    author: 'Maya Rodriguez',
    readTime: '5 min read',
    content: '<p>Grounding your palette in neutrals gives you room for small, expressive accents.</p>'
  },
  {
    id: 'a18',
    slug: 'newsletter-flywheels-for-modern-brands',
    type: 'article',
    title: 'Newsletter Flywheels for Modern Brands',
    category: 'BUSINESS',
    subcategory: 'Content',
    date: 'December 10, 2025',
    excerpt: 'Email is still the highest-signal channel when used with intention.',
    image: businessPost,
    tags: ['Email', 'Newsletters', 'Growth'],
    author: 'Priya Sharma',
    readTime: '8 min read',
    content: '<p>Instead of chasing opens, build newsletters that readers would miss if they stopped arriving.</p>'
  },
  {
    id: 'a19',
    slug: 'building-creative-confidence-as-an-adult-beginner',
    type: 'article',
    title: 'Building Creative Confidence as an Adult Beginner',
    category: 'LIFESTYLE',
    subcategory: 'Creativity',
    date: 'December 3, 2025',
    excerpt: 'It is never too late to start making things that feel like you.',
    image: lifestylePost,
    tags: ['Creativity', 'Habits'],
    author: 'Alex Torres',
    readTime: '6 min read',
    content: '<p>Showing your work early and often is the fastest way to build creative confidence.</p>'
  },
  {
    id: 'a20',
    slug: 'ethical-uses-of-ai-in-fashion-retail',
    type: 'article',
    title: 'Ethical Uses of AI in Fashion Retail',
    category: 'FASHION',
    subcategory: 'Retail',
    date: 'November 26, 2025',
    excerpt: 'Recommendation engines can delight shoppers without being invasive.',
    image: fashionPost,
    tags: ['Fashion', 'AI', 'Retail'],
    author: 'Maya Rodriguez',
    readTime: '7 min read',
    content: '<p>Transparent controls and data minimization keep fashion AI on the right side of trust.</p>'
  },
  {
    id: 'a21',
    slug: 'designing-playlists-for-focus-and-flow',
    type: 'article',
    title: 'Designing Playlists for Focus and Flow',
    category: 'LIFESTYLE',
    subcategory: 'Habits',
    date: 'November 18, 2025',
    excerpt: 'Soundscapes can either fragment attention or gently support it.',
    image: workLifestyle,
    tags: ['Focus', 'Music'],
    author: 'Alex Torres',
    readTime: '4 min read',
    content: '<p>Picking the right tempo and texture for your work blocks can double the quality of your focus.</p>'
  },
  {
    id: 'a22',
    slug: 'practical-guardrails-for-ai-in-product-teams',
    type: 'article',
    title: 'Practical Guardrails for AI in Product Teams',
    category: 'TECHNOLOGY',
    subcategory: 'AI',
    date: 'November 10, 2025',
    excerpt: 'Shipping AI features safely requires both policy and product decisions.',
    image: techPost,
    tags: ['AI', 'Product', 'Safety'],
    author: 'Kai Chen',
    readTime: '9 min read',
    content: '<p>Guardrails work best when they are embedded into tooling instead of just documents.</p>'
  },
  {
    id: 'a23',
    slug: 'micro-brands-that-own-their-supply-chain',
    type: 'article',
    title: 'Micro-Brands That Own Their Supply Chain',
    category: 'BUSINESS',
    subcategory: 'Operations',
    date: 'November 2, 2025',
    excerpt: 'Vertical integration is back—this time with spreadsheets, not factories.',
    image: businessPost,
    tags: ['Supply Chain', 'DTC'],
    author: 'Priya Sharma',
    readTime: '8 min read',
    content: '<p>Owning more of the value chain lets tiny brands move faster and respond to demand in real time.</p>'
  },
  {
    id: 'a24',
    slug: 'the-soft-skills-behind-great-design-leaders',
    type: 'article',
    title: 'The Soft Skills Behind Great Design Leaders',
    category: 'DESIGN',
    subcategory: 'Leadership',
    date: 'October 25, 2025',
    excerpt: 'The best design leaders coach taste, not just process.',
    image: fashionLifestyle,
    tags: ['Leadership', 'Design'],
    author: 'Maya Rodriguez',
    readTime: '7 min read',
    content: '<p>Coaching designers to see like editors unlocks stronger product decisions.</p>'
  },
];

const normalizeStoredItem = (item: ContentItem): ContentItem => ({
  ...item,
  type: 'article',
  createdAt: item.createdAt || new Date().toISOString(),
});

export const getStoredArticles = (): ContentItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ContentItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeStoredItem);
  } catch {
    return [];
  }
};

export const saveStoredArticles = (articles: ContentItem[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

export const addUserArticle = (article: ContentItem) => {
  const existing = getStoredArticles();
  saveStoredArticles([normalizeStoredItem(article), ...existing]);
};

export const updateUserArticle = (id: string, next: Partial<ContentItem>) => {
  const existing = getStoredArticles();
  const updated = existing.map((item) =>
    item.id === id
      ? {
          ...item,
          ...next,
          id: item.id,
          slug: item.slug,
          createdAt: item.createdAt,
        }
      : item
  );
  saveStoredArticles(updated);
};

export const deleteUserArticle = (id: string) => {
  const existing = getStoredArticles();
  const filtered = existing.filter((item) => item.id !== id);
  saveStoredArticles(filtered);
};

export const getAllContent = (): ContentItem[] => {
  const stored = getStoredArticles();
  const sortedStored = [...stored].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  return [...sortedStored, ...baseContent];
};

export const getArticles = () => getAllContent();
export const getBySlug = (slug: string) => getAllContent().find(c => c.slug === slug);
export const getByType = (_type: ContentType) => getAllContent();
export const getRelated = (item: ContentItem, max = 3) =>
  getAllContent()
    .filter(c => c.id !== item.id && c.category === item.category)
    .slice(0, max);

export const getAllCategories = () => [...new Set(getAllContent().map(c => c.category))].sort();
export const getAllTags = () => [...new Set(getAllContent().flatMap(c => c.tags || []))].sort();

export const getCarouselContent = () => getAllContent().slice(0, 6);
export const getTrendingContent = () => getAllContent().slice(0, 8);

