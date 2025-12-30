iframe = mini browser inside browser, yaani:
alag console
alag window
alag JS context
so iframe ka JS, parent ke console ko directly touch nhi kr skta, hamein msg bhejna prta hai

postMessage = safe way to talk between windows

iframe to Parent msg bhejna ho: `window.parent.postMessage(data, "*")`  
Parent to iframe kch bhi bhejna ho:
```
const runConsoleCommand = (msg: string) => {
  iframeRef.current?.contentWindow?.postMessage(
    {
      source: "parent-console",
      msg,
    },
    "*"
  );
};
```
parent mein iframe ka ya iframe mein parent ka dono msg listen krne ke liye: `window.addEventListener("message", fn)`
aur event.data mein wo poora data milta hai jese wo obj ho to poora obj milta hai
ye kch whatsapp msg ke jesa hi hai

`sandbox="allow-scripts"` = iframe tag ka attribute hai for security
is tarh iframe parent ko hack nhi kr skta sirf JS run krna allow
sanbox bolta hai: iframe ab tum bahar kch nhi kr skte
wrna sandbox ke bina iframe kr skta hai:
- parent window access
- cookies churana
- redirect kar dena
- malware possible

Final summary:
- iframe = engine, code chalaana
- React = dashboard, UI dikhaana
- console override = redirect
- postMessage = message, baat-cheet
- sandbox = jail, security-guard
- eval = run string as code


