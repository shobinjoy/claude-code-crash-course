import HookCard from '@/components/HookCard';
import { Hook } from '@/types/hook';
import hooksData from '@/data/hooks.json';

export default function Home() {
  const hooks: Hook[] = hooksData.hooks as Hook[];
  const featuredHooks = hooks.filter(hook => hook.featured);
  const regularHooks = hooks.filter(hook => !hook.featured);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

      {/* Header */}
      <header style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              {/* Anthropic "A" logo mark */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.19 2H6.81L1 14h2.43l1.18-2.73h6.78L12.57 14H15L9.19 2zm-2.38 7.27L8 5.34l1.19 3.93H6.81z" fill="white"/>
              </svg>
            </div>
            <span className="font-semibold text-base tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>HookHub</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--text-secondary)' }}>Browse</a>
            <a href="#" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: 'var(--text-secondary)' }}>Docs</a>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              Submit Hook
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-8"
          style={{ background: 'var(--accent-muted)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span>
          Community-built Claude Code hooks
        </div>
        <h1 className="text-6xl font-bold tracking-tight mb-5 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          Discover Claude<br />Code Hooks
        </h1>
        <p className="text-lg mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Enhance your AI workflows with battle-tested hooks built by the community.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            className="px-5 py-2.5 rounded-lg font-medium text-white text-sm transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            Explore Hooks
          </button>
          <button
            className="px-5 py-2.5 rounded-lg font-medium text-sm transition-colors hover:opacity-80"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <div className="relative max-w-md mx-auto">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search hooks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-shadow focus:shadow-sm"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-24">

        {/* Featured */}
        {featuredHooks.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Featured</span>
              <div className="h-px flex-1" style={{ background: 'var(--border)' }}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredHooks.map((hook) => (
                <HookCard key={hook.id} hook={hook} />
              ))}
            </div>
          </section>
        )}

        {/* All Hooks */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>All Hooks</span>
            <div className="h-px flex-1" style={{ background: 'var(--border)' }}></div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{regularHooks.length} hooks</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularHooks.map((hook) => (
              <HookCard key={hook.id} hook={hook} />
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>© 2025 HookHub. Built for the Claude Code community.</span>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Powered by</span>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                <svg width="9" height="9" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19 2H6.81L1 14h2.43l1.18-2.73h6.78L12.57 14H15L9.19 2zm-2.38 7.27L8 5.34l1.19 3.93H6.81z" fill="white"/>
                </svg>
              </div>
              <span className="text-xs font-semibold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>Anthropic</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
