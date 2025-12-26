"use client";
import { useState } from "react"
import Editor from '@monaco-editor/react';
import { Group, Panel } from "react-resizable-panels";

export default function Home() {
  const [htmlCode, setHtmlCode] = useState<string | undefined>("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  // const [iframeString, setIframeString] = useState("");

  const debounce = (func: Function, delay: number) => {
    let timerId: ReturnType<typeof setTimeout>;

    return function (...args: any[]) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const previewCode = (value: string, str: string) => {
    console.log("rendering");
    if (str == "html") setHtmlCode(value)
    else if (str == "css") setCssCode(value)
    else if (str == "js") setJsCode(value)
  }

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Define a new custom theme
    monaco.editor.defineTheme('my-custom-theme', {
      base: 'vs-dark', // can be 'vs' or 'vs-dark'
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1D1E22', // <-- Your custom background color
      },
    });
    // Apply the custom theme
    monaco.editor.setTheme('my-custom-theme');
  };

  const debouncedPreview = debounce(previewCode, 500);

  return (
    <div className="min-h-screen">
      <Group orientation="vertical" className="h-screen">
        <Panel defaultSize={"60%"} minSize={"20%"}>
          <Group className="bg-[#1C1C1C] h-full flex gap-4 pb-4">

            <Panel minSize={"5%"} className="border border-[#494949]">
              <span className="bg-[#1D1E22] text-[#AAAEBC] font-semibold inline-block py-2 px-4 w-fit">
                HTML
              </span>
              <Editor height={"100%"} defaultLanguage="HTML" theme="vs-dark" onMount={handleEditorDidMount}
                onChange={(value) => debouncedPreview(
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
              <span className="bg-[#1D1E22] text-[#AAAEBC] font-semibold inline-block py-2 px-4 w-fit">
                JS
              </span>
              <Editor height={"100%"} defaultLanguage="javascript" theme="vs-dark" onMount={handleEditorDidMount}
                onChange={(value) => debouncedPreview(value, "js")} />
            </Panel>
          </Group>
        </Panel>

        <Panel collapsible>
          <iframe className="w-full h-full bg-white" srcDoc={`
            <head>
              <style>${cssCode}</style>
            </head>
            <body>${htmlCode}
              <script>${jsCode}</script>
            </body>
              `}></iframe>
        </Panel>

        <Panel defaultSize={"90px"}>
          <div className="fixed bottom-0 left-0 right-0 max-h-40 overflow-hidden flex flex-col">
            <div className="console-tab bg-[#1C1C1C] py-1 px-2 flex items-center justify-between space-x-2">
              <span className="font-semibold inline-block">Console</span>
              <div className="flex gap-2 text-right">
                <button className="bg-gray-600 py-1 px-2 text-sm">Clear</button>
                <button className="bg-gray-600 py-1 px-2 text-sm">X</button>
              </div>
            </div>

            <div className="console-input bg-gray-700 py-1 px-2 flex items-center space-x-2">
              <span className="font-semibold">&gt;</span>
              <textarea className="flex-1  outline-none overflow-y-hidden resize-none field-sizing-content"></textarea>
            </div>

            <div className="bg-gray-800 py-1 px-2">
              <button className="bg-gray-500 text-[12px] rounded-sm py-1 px-2 cursor-pointer">Console</button>
            </div>
          </div>
        </Panel>
      </Group>

      {/* <div className="fixed bottom-0 left-0 right-0 max-h-40 overflow-hidden flex flex-col">
        <div className="bg-gray-800 py-1 px-2 order-3">
          <button className="bg-gray-500 text-[12px] rounded-sm py-1 px-2 cursor-pointer">Console</button>
        </div>
        <div className="console-input bg-gray-700 py-1 px-2 flex items-center space-x-2 order-2">
          <span className="font-semibold">&gt;</span>
          <textarea className="flex-1 border-none outline-none overflow-y-hidden resize-none field-sizing-content"></textarea>
        </div>
        <div className="console-tab bg-[#1C1C1C] py-1 px-2 flex items-center justify-between space-x-2 order-1">
          <span className="font-semibold inline-block">Console</span>
          <div className="flex gap-2 text-right">
            <button className="bg-gray-600 py-1 px-2 text-sm">Clear</button>
            <button className="bg-gray-600 py-1 px-2 text-sm">X</button>  
          </div>
        </div>
      </div> */}
    </div>
  )
}