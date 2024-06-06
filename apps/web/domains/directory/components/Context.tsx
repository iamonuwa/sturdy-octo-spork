// Modified from https://github.com/geist-org/geist-ui/blob/b48b8238e7aaf92b2aa3749a688e4ffcb29476e4/components/tree/tree-context.ts
import React from "react";

export interface TreeConfig {
  onFileClick?: (path: string) => void;
  initialExpand?: boolean;
  isImperative: boolean;
}

const defaultContext = {
  onFileClick: () => {},
  initialExpand: false,
  isImperative: false,
};

export const TreeContext = React.createContext<TreeConfig>(defaultContext);

export const useTreeContext = (): TreeConfig =>
  React.useContext<TreeConfig>(TreeContext);
