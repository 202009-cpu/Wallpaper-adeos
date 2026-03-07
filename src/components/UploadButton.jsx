export default function UploadButton({ onClick, disabled, children = 'Upload' }) {
  return (
    <button className="primary-btn" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
