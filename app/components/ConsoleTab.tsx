import { Dispatch, RefObject, SetStateAction, useState } from 'react'
import { Panel } from 'react-resizable-panels'

interface Props {
  consoleMessages: any[],
  setConsoleMessages: Dispatch<SetStateAction<{
    type: any, message: any
  }[]>>,
  setIsConsoleTab: Dispatch<SetStateAction<boolean>>
  iframeRef: RefObject<HTMLIFrameElement | null>
}

const ConsoleTab = ({ consoleMessages, setIsConsoleTab, setConsoleMessages, iframeRef }: Props) => {
  const [consoleInputValue, setConsoleInputValue] = useState("");

  const runConsole = (code: string) => {
    iframeRef.current?.contentWindow?.postMessage({
      type: "RUN_CONSOLE",
      code
    }, "*")
    setConsoleMessages(prev => [
      ...prev,
      { type: "log", message: "> " + code }
    ]);
  }

  const handleKeyDown = (event: any) => {
    console.log(event);
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      runConsole(consoleInputValue);
      setConsoleInputValue("")
    }
  }

  return (
    <Panel defaultSize={"70px"} minSize={"70px"}>
      <div className="top-bar bg-[#1C1C1C] py-1.5 px-2 flex items-center justify-between space-x-2 z-100">
        <span className="font-semibold inline-block">Console</span>
        <div className="flex gap-2 text-right">
          <button className="bg-gray-600 py-0.5 px-1.5 rounded-sm text-sm cursor-pointer" onClick={() => setConsoleMessages([])}>Clear</button>
          <button className="bg-gray-600 py-0.5 px-1.5 text-sm cursor-pointer rounded-sm" onClick={() => setIsConsoleTab(false)}>X</button>
        </div>
      </div>

      <div className="h-[calc(100%-70px)] flex flex-col justify-between">
        <div className="console-output h-full bg-[#1D1E22] divide-y divide-[#5A5F73] overflow-y-auto">
          {consoleMessages.map((msg, i) => (
            <div className={`text-[13px] font-mono p-4 ${msg.type == "error" ? "bg-[#4A181B] text-[#FFFFDA]" : "text-[#D0782A]"}`} key={i}>
              {msg.message}</div>
          ))}
        </div>

        <div className="console-input bg-gray-700 py-1 px-2 flex items-center space-x-2 z-1">
          <span className="font-semibold">&gt;</span>
          <textarea className="flex-1  outline-none overflow-y-hidden resize-none field-sizing-content" value={consoleInputValue} onChange={(e) => setConsoleInputValue(e.target.value)}
            onKeyDown={handleKeyDown}>
          </textarea>
        </div>
      </div>
    </Panel>
  )
}

export default ConsoleTab