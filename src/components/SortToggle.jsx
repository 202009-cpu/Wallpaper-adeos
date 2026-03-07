export default function SortToggle({ mode, onChange }) {
  return (
    <div className="sort-toggle">
      <button className={mode === 'new' ? 'active' : ''} onClick={() => onChange('new')}>
        Newest
      </button>
      <button className={mode === 'popular' ? 'active' : ''} onClick={() => onChange('popular')}>
        Most Downloaded
      </button>
    </div>
  );
}
