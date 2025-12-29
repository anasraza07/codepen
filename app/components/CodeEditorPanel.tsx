import { Editor } from '@monaco-editor/react'
import { Group, Panel } from 'react-resizable-panels'

const CodeEditorPanel = ({ previewCode }: {
  previewCode: (value: string, str: string) => void;
}) => {
  const handleEditorDidMount = (editor: any, monaco: any) => {
    monaco.editor.defineTheme('my-custom-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1D1E22',
      },
    });

    monaco.editor.setTheme('my-custom-theme');
  };

  const debounce = (func: Function, delay: number) => {
    let timerId: ReturnType<typeof setTimeout>;

    return function (...args: any[]) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const debouncedPreview = debounce(previewCode, 500);

  return (
    <Panel defaultSize={"60%"} minSize={"20%"}>
      <Group className="bg-[#1C1C1C] h-full flex gap-4 pb-4">
        <Panel minSize={"5%"} className="border border-[#494949]">
          <span className="bg-[#1D1E22] text-[#AAAEBC] font-semibold inline-block py-2 px-4 w-fit">
            HTML
          </span>
          <Editor height={"100%"} defaultLanguage="HTML" theme="vs-dark" onMount={handleEditorDidMount} onChange={(value) => debouncedPreview(
            value, "html")} />
        </Panel>

        <Panel minSize={"5%"} className="border
                border-[#494949]">
          <span className="bg-[#1D1E22] text-[#AAAEBC] font-semibold inline-block py-2 px-4 w-fit">
            CSS
          </span>
          <Editor height={"100%"} defaultLanguage="CSS" theme="vs-dark" onMount={handleEditorDidMount}
            onChange={(value) => debouncedPreview(
              value, "css")} />
        </Panel>

        <Panel minSize={"5%"} className="border border-[#494949]">
          <span className="bg-[#1D1E22] text-[#AAAEBC] font-semibold inline-block py-2 px-4 w-fit">JS</span>
          <Editor height={"100%"} defaultLanguage="javascript" theme="vs-dark" onMount={handleEditorDidMount}
            onChange={(value) => {
              console.log(value);
              debouncedPreview(value, "js")
            }} />
        </Panel>
      </Group>
    </Panel>
  )
}

export default CodeEditorPanel