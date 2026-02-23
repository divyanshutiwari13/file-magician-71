import FileConverter from "../components/FileConverter";

const PdfToWord = () => (
  <FileConverter
    title="PDF to Word Converter"
    subtitle="Convert your PDF documents to editable Word files"
    accept=".pdf"
    icon="bi-filetype-pdf"
    color="#dc3545"
  />
);

export default PdfToWord;
