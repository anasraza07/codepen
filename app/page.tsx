"use client";
import { useEffect, useRef, useState } from "react"
import Editor from '@monaco-editor/react';
import { Group, Panel } from "react-resizable-panels";
import CodeEditorPanel from "./components/CodeEditorPanel";
import CodePreview from "./components/CodePreview";
import ConsoleTab from "./components/ConsoleTab";

export default function Home() {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [isConsoleTab, setIsConsoleTab] = useState(false);
  const [consoleMessages, setConsoleMessages] =
    useState<{ type: any; message: any; }[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const iframeSrcDoc = `  
    <head>
      <style>${cssCode}</style>
    </head>
    <body>
      ${htmlCode}
      <script>
        (function () {
          const send = (type, message) => {
            window.parent.postMessage({
              source: "iframe-console",
              type,
              message
            }, "*");
          };

          console.log = (...args) => send("log", args.join(" "));

          console.error = (...args) => send("error", args.join(" "));

          window.onerror = (message, source, line, col) => {
            send("error", message + " (" + line + ":" + col + ")");
          };

          window.addEventListener("message", (e) => {
            if (e.data?.type !== "RUN_CONSOLE") return;

            try {
              const result = eval(e.data.code);
              if (result !== undefined) send("log", String(result));
            } catch (err) {
              send("error", err.message);
            }
          });
        })();
      </script>

      <script>
        try {
          ${jsCode.trim()}
        } catch (err) {
          window.parent.postMessage({
            source: "iframe-console",
            type: "error",
            message: err.message
          }, "*");
        }
      </script>
    </body>
  `;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.source != "iframe-console") return;

      setConsoleMessages(prev => [...prev, {
        type: event.data.type, message: event.data.message
      }])
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const previewCode = (value: string, str: string) => {
    if (str == "html") setHtmlCode(value)
    else if (str == "css") setCssCode(value)
    else if (str == "js") setJsCode(value)
  }

  return (
    <div className="min-h-screen">
      <Group orientation="vertical" className="h-screen">
        <CodeEditorPanel previewCode={previewCode} />
        <CodePreview iframeSrcDoc={iframeSrcDoc} iframeRef={iframeRef} />

        {isConsoleTab &&
          <ConsoleTab consoleMessages={consoleMessages}
            setIsConsoleTab={setIsConsoleTab}
            setConsoleMessages={setConsoleMessages}
            iframeRef={iframeRef} />}

        <div className="bg-gray-800 fixed bottom-0 left-0 right-0 py-1 px-2 z-100">
          <button className="bg-gray-500 text-[12px] rounded-sm py-1 px-2 cursor-pointer" onClick={() => setIsConsoleTab(!isConsoleTab)}>Console</button>
        </div>
      </Group>
    </div>
  )
}