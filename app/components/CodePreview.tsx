import { RefObject, useRef } from 'react';
import { Panel } from 'react-resizable-panels'

interface Props {
  iframeSrcDoc: string,
  iframeRef: RefObject<HTMLIFrameElement | null>
}

const CodePreview = ({ iframeSrcDoc, iframeRef }: Props) => {

  return (
    <Panel collapsible>
      <iframe ref={iframeRef} className="w-full h-full bg-white"
        srcDoc={iframeSrcDoc}>
      </iframe>
    </Panel>
  )
}

export default CodePreview