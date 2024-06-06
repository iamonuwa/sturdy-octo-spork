import React, { PropsWithChildren, useCallback, useMemo } from "react";

import { TreeContext } from "./Context";
import { TreeFile } from "./FileTree";
import { TreeFolder } from "./Folder";
import { cn } from "@machines/ui/cn";
import { sortChildren } from "../utils";

enum FileTreeValueType {
  directory = "directory",
  file = "file",
}

const directoryType = Object.values(FileTreeValueType)[0] as FileTreeValueType;

export type TreeFile = {
  type: FileTreeValueType;
  name: string;
  extra?: string;
  files?: Array<TreeFile>;
};

interface Props {
  value?: Array<TreeFile>;
  initialExpand?: boolean;
  onClick?: (path: string) => void;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TreeProps = Props & NativeAttrs;

const makeChildren = (value: Array<TreeFile> = []) => {
  if (!value || !value.length) return null;
  return value
    .sort((a, b) => {
      if (a.type !== b.type) return a.type !== directoryType ? 1 : -1;

      return `${a.name}`.charCodeAt(0) - `${b.name}`.charCodeAt(0);
    })
    .map((item, index) => {
      if (item.type === directoryType)
        return (
          <TreeFolder
            name={item.name}
            extra={item.extra}
            key={`folder-${item.name}-${index}`}
          >
            {makeChildren(item.files)}
          </TreeFolder>
        );
      return (
        <TreeFile
          name={item.name}
          extra={item.extra}
          key={`file-${item.name}-${index}`}
        />
      );
    });
};

export const Tree = ({
  children,
  onClick,
  initialExpand,
  value,
  className,
  ...props
}: PropsWithChildren<TreeProps>) => {
  const isImperative = Boolean(value && value.length > 0);

  const onFileClick = useCallback(
    (path: string) => {
      onClick && onClick(path);
    },
    [onClick]
  );

  const initialValue = useMemo(
    () => ({
      onFileClick,
      initialExpand,
      isImperative,
    }),
    [initialExpand, isImperative, onFileClick]
  );

  const customChildren = isImperative
    ? makeChildren(value)
    : sortChildren(children, TreeFolder);

  return (
    <TreeContext.Provider value={initialValue}>
      <div className={cn("tree", className)} {...props}>
        {customChildren}
        <style jsx>{`
          .tree {
            padding-left: 1.625rem;
          }
        `}</style>
      </div>
    </TreeContext.Provider>
  );
};

Tree.File = TreeFile;
Tree.Folder = TreeFolder;
