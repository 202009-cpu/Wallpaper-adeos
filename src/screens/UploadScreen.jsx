import UploadForm from '../components/UploadForm';

export default function UploadScreen({ onUpload, progress, error }) {
  return (
    <section>
      <UploadForm onSubmit={onUpload} progress={progress} />
      {error && <p className="state-msg error">{error}</p>}
    </section>
  );
}
