import FileConverter from "../components/FileConverter";

const WordToPdf = () => (
  <FileConverter
    title="Word to PDF Converter"
    subtitle="Transform your Word documents into professional PDFs"
    accept=".doc,.docx"
    icon="bi-filetype-docx"
    color="#0d6efd"
  />
);

export default WordToPdf;
