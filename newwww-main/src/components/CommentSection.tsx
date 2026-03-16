import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/auth-store';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  contentType: 'article';
  slug: string;
  title?: string;
}

const CommentSection = ({ contentType, slug, title }: CommentSectionProps) => {
  const { toast } = useToast();
  const { user, openAuthModal, addComment, updateComment, deleteComment, getCommentsForItem } = useAuthStore();
  const [body, setBody] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState('');

  const comments = getCommentsForItem(contentType, slug);

  const { roots, repliesByParent } = useMemo(() => {
    const rootComments = comments.filter((c) => !c.parentId);
    const replyMap = new Map<string, typeof comments>();
    comments
      .filter((c) => c.parentId)
      .forEach((c) => {
        const parent = c.parentId as string;
        replyMap.set(parent, [...(replyMap.get(parent) || []), c]);
      });
    return { roots: rootComments, repliesByParent: replyMap };
  }, [comments]);

  const ensureAuth = () => {
    if (!user) {
      openAuthModal('login');
      toast({ title: 'Sign in required', description: 'Please sign in to comment.' });
      return false;
    }
    return true;
  };

  const handleCreate = () => {
    if (!ensureAuth()) return;
    if (!body.trim()) {
      toast({ title: 'Comment required', description: 'Please write a comment before submitting.' });
      return;
    }
    addComment({
      userId: user!.id,
      userName: user!.name,
      contentType,
      slug,
      body: body.trim(),
      parentId: null,
    });
    setBody('');
    toast({ title: 'Comment added', description: 'Your comment is now visible.' });
  };

  const handleReply = (parentId: string) => {
    if (!ensureAuth()) return;
    if (!replyBody.trim()) {
      toast({ title: 'Reply required', description: 'Please write a reply before submitting.' });
      return;
    }
    addComment({
      userId: user!.id,
      userName: user!.name,
      contentType,
      slug,
      body: replyBody.trim(),
      parentId,
    });
    setReplyBody('');
    setReplyTo(null);
  };

  const handleEdit = (commentId: string) => {
    if (!editBody.trim()) {
      toast({ title: 'Comment required', description: 'Please write a comment before saving.' });
      return;
    }
    updateComment(commentId, editBody.trim());
    setEditingId(null);
    setEditBody('');
    toast({ title: 'Comment updated', description: 'Your changes were saved.' });
  };

  const handleDelete = (commentId: string) => {
    deleteComment(commentId);
    toast({ title: 'Comment deleted', description: 'Your comment was removed.' });
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Discussion</h2>
        {title && <p className="text-sm text-muted-foreground">Share your thoughts about {title}.</p>}
      </div>

      <div className="bg-muted/30 rounded-xl p-6 space-y-4">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={user ? 'Write a comment...' : 'Sign in to write a comment'}
          disabled={!user}
          className="min-h-[120px]"
          maxLength={800}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{body.length}/800</p>
          <Button size="sm" onClick={handleCreate} disabled={!user}>
            Post Comment
          </Button>
        </div>
      </div>

      {roots.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-6">No comments yet. Start the conversation.</p>
      )}

      <div className="space-y-5">
        {roots.map((comment) => {
          const replies = repliesByParent.get(comment.id) || [];
          const isOwner = user?.id === comment.userId;
          const isEditing = editingId === comment.id;

          return (
            <div key={comment.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{comment.userName}</p>
                  <p className="text-xs text-muted-foreground">{comment.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (!ensureAuth()) return;
                      setReplyTo(comment.id);
                      setReplyBody('');
                    }}
                  >
                    Reply
                  </Button>
                  {isOwner && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditBody(comment.body);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(comment.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <Textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(comment.id)}>Save</Button>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingId(null); setEditBody(''); }}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">{comment.body}</p>
              )}

              {replyTo === comment.id && (
                <div className="mt-3 bg-muted/40 rounded-lg p-4 space-y-3">
                  <Textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder="Write a reply..."
                    className="min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleReply(comment.id)}>Post Reply</Button>
                    <Button variant="ghost" size="sm" onClick={() => { setReplyTo(null); setReplyBody(''); }}>Cancel</Button>
                  </div>
                </div>
              )}

              {replies.length > 0 && (
                <div className="mt-4 space-y-3">
                  {replies.map((reply) => {
                    const replyOwner = user?.id === reply.userId;
                    const replyEditing = editingId === reply.id;

                    return (
                      <div key={reply.id} className="ml-6 border-l border-border/60 pl-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">{reply.userName}</p>
                            <p className="text-xs text-muted-foreground">{reply.date}</p>
                          </div>
                          {replyOwner && (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingId(reply.id);
                                  setEditBody(reply.body);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(reply.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                        {replyEditing ? (
                          <div className="space-y-2">
                            <Textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleEdit(reply.id)}>Save</Button>
                              <Button variant="ghost" size="sm" onClick={() => { setEditingId(null); setEditBody(''); }}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">{reply.body}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommentSection;
