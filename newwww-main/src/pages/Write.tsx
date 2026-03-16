import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { addUserArticle, getAllCategories, getAllContent, getBySlug, updateUserArticle, type ContentItem } from '@/lib/data';
import { useAuthStore } from '@/store/auth-store';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const formatContent = (value: string) => {
  const blocks = value.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  return blocks
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br/>')}</p>`)
    .join('');
};

const estimateReadTime = (value: string) => {
  const words = value.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const Write = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, openAuthModal } = useAuthStore();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const categories = useMemo(() => getAllCategories(), []);

  const editSlug = searchParams.get('edit');
  const editingArticle = useMemo(
    () => (editSlug ? getBySlug(editSlug) : undefined),
    [editSlug]
  );

  const isEditing =
    !!editingArticle && editingArticle.type === 'article';

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugEdited) {
      setSlug(slugify(value));
    }
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image file.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setImage(result);
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const resolveCategory = () => (customCategory.trim() ? customCategory.trim().toUpperCase() : category);

  const generateUniqueSlug = (base: string) => {
    const existing = new Set(getAllContent().map((item) => item.slug));
    if (!existing.has(base)) return base;
    let index = 2;
    while (existing.has(`${base}-${index}`)) index += 1;
    return `${base}-${index}`;
  };

  const handlePublish = () => {
    if (!user) {
      openAuthModal('login');
      toast({ title: 'Sign in required', description: 'Please sign in to publish an article.' });
      return;
    }

    const finalCategory = resolveCategory();

    if (!title.trim()) {
      toast({ title: 'Title required', description: 'Please enter a title.' });
      return;
    }
    if (!finalCategory) {
      toast({ title: 'Category required', description: 'Please choose or enter a category.' });
      return;
    }
    if (!excerpt.trim()) {
      toast({ title: 'Excerpt required', description: 'Please add a short excerpt.' });
      return;
    }
    if (!content.trim()) {
      toast({ title: 'Content required', description: 'Please write your article content.' });
      return;
    }
    if (!image) {
      toast({ title: 'Cover image required', description: 'Please upload a cover image.' });
      return;
    }

    const now = new Date();
    const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const tagList = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (isEditing && editingArticle && editingArticle.type === 'article') {
      if (editingArticle.authorId && editingArticle.authorId !== user.id) {
        toast({ title: 'Not allowed', description: 'You can only edit your own articles.' });
        return;
      }

      updateUserArticle(editingArticle.id, {
        title: title.trim(),
        category: finalCategory,
        excerpt: excerpt.trim(),
        image,
        tags: tagList,
        author: user.name,
        readTime: estimateReadTime(content),
        content: formatContent(content),
        rawContent: content,
      });

      toast({ title: 'Article updated', description: 'Your changes have been saved.' });
      navigate(`/blog/${editingArticle.slug}`);
      return;
    }

    const baseSlug = slugify(slug || title);
    const finalSlug = generateUniqueSlug(baseSlug || `article-${Date.now()}`);

    const article: ContentItem = {
      id: crypto.randomUUID(),
      slug: finalSlug,
      type: 'article',
      title: title.trim(),
      category: finalCategory,
      date,
      excerpt: excerpt.trim(),
      image,
      tags: tagList,
      author: user.name,
      authorId: user.id,
      rawContent: content,
      readTime: estimateReadTime(content),
      content: formatContent(content),
      createdAt: now.toISOString(),
    };

    addUserArticle(article);
    toast({ title: 'Article published', description: 'Your article is now live.' });
    navigate(`/blog/${finalSlug}`);
  };

  useEffect(() => {
    if (!user) return;
    if (!isEditing || !editingArticle || editingArticle.type !== 'article') return;
    if (editingArticle.authorId && editingArticle.authorId !== user.id) return;

    setTitle(editingArticle.title);
    setSlug(editingArticle.slug);
    setSlugEdited(true);
    setCategory(editingArticle.category);
    setCustomCategory('');
    setExcerpt(editingArticle.excerpt);
    setTags((editingArticle.tags || []).join(', '));
    setImage(editingArticle.image);
    setImageName('');
    setContent(editingArticle.rawContent || '');
  }, [user, isEditing, editingArticle]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="container-blog py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Write an Article</h1>
          <p className="text-muted-foreground mb-6">Sign in to start publishing your own articles.</p>
          <Button onClick={() => openAuthModal('login')}>Sign In</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12 space-y-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Write an Article</h1>
          <p className="text-muted-foreground">Draft, preview, and publish your story.</p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Article title" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Slug</label>
              <Input
                value={slug}
                onChange={(e) => { setSlugEdited(true); setSlug(e.target.value); }}
                placeholder="article-slug"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Custom Category</label>
                <Input value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} placeholder="Optional" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tags (comma separated)</label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Design, AI, Business" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Excerpt</label>
              <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary for previews" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Cover Image</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] || null)} />
                <Button variant="outline" size="sm" onClick={() => { setImage(''); setImageName(''); }}>
                  Remove
                </Button>
              </div>
              {imageName && <p className="text-xs text-muted-foreground">Selected: {imageName}</p>}
              {image && (
                <img src={image} alt="Cover preview" className="w-full max-h-64 object-cover rounded-lg border border-border" />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article here..."
                rows={12}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => setPreviewMode((prev) => !prev)}>
                {previewMode ? 'Hide Preview' : 'Preview'}
              </Button>
              <Button onClick={handlePublish}>Publish Article</Button>
            </div>
          </div>

          {previewMode && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <p className="text-xs text-muted-foreground uppercase">Preview</p>
              <h2 className="text-2xl font-bold text-foreground">{title || 'Untitled Article'}</h2>
              <p className="text-sm text-muted-foreground">{resolveCategory() || 'Uncategorized'} · {estimateReadTime(content)}</p>
              {image && <img src={image} alt="Preview" className="w-full max-h-80 object-cover rounded-lg border border-border" />}
              <p className="text-muted-foreground">{excerpt || 'No excerpt yet.'}</p>
              <div
                className="prose prose-lg max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: formatContent(content) || '<p>No content yet.</p>' }}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Write;
