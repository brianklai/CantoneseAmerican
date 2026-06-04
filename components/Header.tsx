export default function Header() {
  return (
    <header className="relative z-30 border-b border-rule bg-paper/80 backdrop-blur supports-[backdrop-filter]:bg-paper/70 sticky top-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14">
          <a href="#" className="flex items-baseline gap-3 group">
            <span className="font-serif text-[15px] tracking-tight">
              Cantonese American
            </span>
            <span
              className="hidden sm:inline-block h-3 w-px bg-rule"
              aria-hidden
            />
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-ultra text-muted group-hover:text-ink transition-colors">
              A Speaking American Project
            </span>
          </a>
          <nav className="flex items-center gap-6">
            <a
              href="#archive"
              className="hidden md:inline-block text-[10px] uppercase tracking-ultra text-muted hover:text-ink transition-colors"
            >
              Archive
            </a>
            <a
              href="#why"
              className="hidden md:inline-block text-[10px] uppercase tracking-ultra text-muted hover:text-ink transition-colors"
            >
              Why
            </a>
            <a
              href="#submit"
              className="text-[10px] uppercase tracking-ultra text-ink hover:text-accent transition-colors"
            >
              Nominate a Scene
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
