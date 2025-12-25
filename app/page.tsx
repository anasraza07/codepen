"use client";
import { ChangeEvent, useState } from "react"
import { EditorView, keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

export default function Home() {
  const [htmlCode, setHtmlCode] = useState<string | undefined>("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [iframeString, setIframeString] = useState("");

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

  const debouncedPreview = debounce(previewCode, 500);

  return (
    <div className="">
      <div className="p-2 flex items-stretch">
        <div className="flex-1 min-w-sm min-h-80 rounded-sm">
          <Editor className="w-full" defaultLanguage="HTML" theme="vs-dark" defaultValue=""
            onChange={(value) => debouncedPreview(value, "html")} />
        </div>
        <div className="flex-1 min-w-sm min-h-80 rounded-sm">
          <Editor defaultLanguage="CSS" theme="vs-dark" defaultValue="" onChange={(value) =>
            debouncedPreview(value, "css")} />
        </div>
        <div className="flex-1 min-w-sm min-h-80 rounded-sm">
          <Editor defaultLanguage="javascript" theme="vs-dark" defaultValue="" onChange={(value) =>
            debouncedPreview(value, "js")} />
        </div>
      </div>
      <div className="w-full min-h-[calc(100vh-336px)] border bg-white">
        <iframe className="w-full 
        min-h-[calc(100vh-338px)]" srcDoc={`
        <head>
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}
          <script>${jsCode}</script>
        </body>
          `}></iframe>

      </div>
    </div>
  )
}