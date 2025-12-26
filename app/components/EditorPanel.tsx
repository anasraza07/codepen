import { Editor, OnChange } from "@monaco-editor/react";

interface Props {
  title: string,
  handleEditorDidMount: (editor: any, monaco: any) => void;
  debouncedPreview: () => void;
}


const EditorPanel = ({ title,
  handleEditorDidMount, debouncedPreview }: Props) => {
  return (
    <>
      <span className="bg-[#1D1E22] text-[#AAAEBC] font-semibold inline-block py-2 px-4 w-fit">{title}</span>
      <Editor height={"100%"} defaultLanguage="CSS" theme="vs-dark" />
    </>
  )
}

export default EditorPanel