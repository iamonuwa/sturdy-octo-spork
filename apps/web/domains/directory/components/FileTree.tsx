import React, { useMemo } from "react";
import { makeChildPath, stopPropagation } from "../utils";

import { FileIcon } from "lucide-react";
import { TreeIndent } from "./TreeIndent";
import { cn } from "@machines/ui/cn";
import { useTreeContext } from "./Context";

interface Props {
  name: string;
  extra?: string;
  parentPath?: string;
  level?: number;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TreeFileProps = Props & NativeAttrs;

export const TreeFile: React.FC<React.PropsWithChildren<TreeFileProps>> = ({
  name,
  parentPath,
  level,
  extra,
  className,
  ...props
}) => {
  const { onFileClick } = useTreeContext();

  const currentPath = useMemo(
    () => makeChildPath(name, parentPath),
    [name, parentPath]
  );

  const clickHandler = (event: React.MouseEvent) => {
    stopPropagation(event);
    onFileClick && onFileClick(currentPath);
  };

  return (
    <div className={cn("file", className)} onClick={clickHandler} {...props}>
      <div className="names">
        <TreeIndent count={level} />
        <span className="icon">
          <FileIcon className="h-4 w-4 text-secondary" />
        </span>
        <span className="text-secondary text-xs">
          {name}
          {extra && <span className="extra">{extra}</span>}
        </span>
      </div>
      <style jsx>{`
        .file {
          cursor: pointer;
          line-height: 1;
          user-select: none;
          margin-left: calc(1.875rem * ${level});
        }

        .names {
          display: flex;
          height: 1.75rem;
          align-items: center;
          position: relative;
        }

        .names > :global(.indent) {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 100%;
          margin-left: -1px;
        }

        .icon {
          width: 1.5rem;
          height: 100%;
          display: inline-flex;
          align-items: center;
          margin-right: 0.5rem;
        }

        .name {
          transition: opacity 100ms ease 0ms;
          white-space: nowrap;
          font-size: 0.875rem;
        }

        .extra {
          font-size: 0.75rem;
          align-self: baseline;
          padding-left: 4px;
        }

        .name:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};
