import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Newspaper, Calendar, Clock, ArrowRight, ArrowLeft, User, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogPosts('all')
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 30px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.08) 0%, transparent 60%)' }}>
        <div className="container-custom">
          <div className="badge badge-violet" style={{ marginBottom: '14px' }}>
            <Newspaper size={13} />
            <span>ENGINEERING & AI RESEARCH</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#0B132B', marginBottom: '16px', fontWeight: 900 }}>
            COGNISYS INSIGHTS & LABS
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#1E293B', maxWidth: '640px', margin: '0 auto', fontWeight: 500 }}>
            Technical deep-dives into edge computer vision, modern web architectures, distributed systems, and student engineering methodologies.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding" style={{ paddingTop: '30px' }}>
        <div className="container-custom">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div className="badge">LOADING RESEARCH ARTICLES...</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {posts.map((post) => (
                <div key={post.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.1)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)' }}>
                  {post.image_url && (
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img
                        src={post.image_url}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="badge">{post.category}</span>
                      <span style={{ fontSize: '0.75rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <Clock size={12} />
                        {post.read_time}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: '#0B132B', fontWeight: 700, marginBottom: '10px' }}>
                      {post.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: '#1E293B', lineHeight: 1.6, marginBottom: '20px', flex: 1, fontWeight: 500 }}>
                      {post.summary}
                    </p>

                    <div style={{ borderTop: '1px solid rgba(15, 23, 42, 0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: '#0F172A', fontWeight: 600 }}>
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                      <Link to={`/blog/${post.slug}`} style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>Read Article</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getBlogPostBySlug(slug)
      .then(data => setPost(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '60vh' }}>
        <div className="badge">LOADING ARTICLE...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ color: '#0B132B' }}>Article Not Found</h2>
        <Link to="/blog" className="btn-primary" style={{ marginTop: '20px' }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '72px' }}>
      <section style={{ padding: '40px 0 30px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-custom" style={{ maxWidth: '820px' }}>
          <Link to="/blog" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#0F172A',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px'
          }}>
            <ArrowLeft size={16} />
            <span>Back to Insights</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="badge">{post.category}</span>
            <span style={{ fontSize: '0.8rem', color: '#0F172A', fontWeight: 600 }}>{post.read_time}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: '#0B132B', marginBottom: '18px', lineHeight: 1.2, fontWeight: 800 }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: '#0F172A', fontWeight: 600 }}>
            <span>By {post.author_name}</span>
            <span>•</span>
            <span>{new Date(post.published_at).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom" style={{ maxWidth: '820px' }}>
          {post.image_url && (
            <div className="glass-panel" style={{ overflow: 'hidden', maxHeight: '420px', marginBottom: '40px' }}>
              <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#1E293B',
            whiteSpace: 'pre-line'
          }}>
            {post.content}
          </div>

          <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
            <Link to="/order" className="btn-primary" style={{ padding: '12px 28px' }}>
              <span>Build an AI System with Cognisys</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
