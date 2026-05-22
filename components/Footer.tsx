export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-12 gap-y-6 items-end">
          <div className="col-span-12 sm:col-span-6">
            <div className="font-serif text-2xl">Cantonese American</div>
            <div className="mt-2 text-[10px] uppercase tracking-ultra text-muted">
              A Speaking American Project · Series 001 · American, In Cantonese
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 sm:text-right text-[12px] text-muted">
            <div>
              © {year} Speaking American. All scenes belong to their makers.
            </div>
            <div className="mt-2 flex gap-5 sm:justify-end">
              <a href="#featured" className="hover:text-accent transition-colors">
                Archive
              </a>
              <a href="#submit" className="hover:text-accent transition-colors">
                Submit
              </a>
              <a href="#follow" className="hover:text-accent transition-colors">
                Follow
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
