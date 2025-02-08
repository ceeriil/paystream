declare module "react-copy-to-clipboard" {
  import * as React from "react";

  export interface Options {
    debug?: boolean;
    message?: string;
    format?: string;
  }

  export interface CopyToClipboardProps {
    children?: React.ReactChild;
    text: string;
    onCopy?: (text: string, result: boolean) => void;
    options?: Options;
  }

  export default class CopyToClipboard extends React.PureComponent<CopyToClipboardProps> {}
}
