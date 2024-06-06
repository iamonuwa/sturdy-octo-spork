import { FolderIcon, SquarePlusIcon } from "lucide-react";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  makeChildPath,
  setChildrenProps,
  sortChildren,
  stopPropagation,
} from "../utils";

import { TreeFile } from "./FileTree";
import { TreeIndent } from "./TreeIndent";
import { TreeStatusIcon } from "./TreeStatusIcon";
import { cn } from "@machines/ui/cn";
import { useTreeContext } from "./Context";

// import Expand from '../shared/expand'

interface Props {
  name: string;
  extra?: string;
  parentPath?: string;
  level?: number;
  className?: string;
}

const defaultProps = {
  level: 0,
  className: "",
  parentPath: "",
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TreeFolderProps = Props & NativeAttrs;

export const TreeFolder: FC<React.PropsWithChildren<TreeFolderProps>> = ({
  name,
  children,
  parentPath,
  level: parentLevel,
  extra,
  className,
  ...props
}) => {
  const { initialExpand, isImperative } = useTreeContext();
  const [expanded, setExpanded] = useState<boolean | undefined>(initialExpand);
  useEffect(() => setExpanded(initialExpand), [initialExpand]);

  const currentPath = useMemo(
    () => makeChildPath(name, parentPath),
    [name, parentPath]
  );
  const clickHandler = () => setExpanded(!expanded);

  const nextChildren = setChildrenProps(
    children,
    {
      parentPath: currentPath,
      level: Number(parentLevel ?? 0) + 1,
    },
    [TreeFolder, TreeFile]
  );

  const sortedChildren = isImperative
    ? nextChildren
    : sortChildren(nextChildren, TreeFolder);

  return (
    <div className={cn("folder", className)} onClick={clickHandler} {...props}>
      <div className="names">
        <TreeIndent count={parentLevel} />
        <span className="status">
          <SquarePlusIcon className="h-4 w-4 text-secondary" />
        </span>
        <span className="icon">
          <FolderIcon className="h-4 w-4 text-secondary" />
        </span>
        <span className="text-secondary text-xs">
          {name}
          {extra && <span className="extra">{extra}</span>}
        </span>
      </div>
      {/* <Expand isExpanded={expanded}> */}
      {/* <div className="content" onClick={stopPropagation}> */}
      {/* {sortedChildren} */}
      {/* </div> */}
      {/* </Expand> */}

      <style jsx>{`
        .folder {
          cursor: pointer;
          line-height: 1;
          user-select: none;
        }

        .names {
          display: flex;
          height: 1.75rem;
          align-items: center;
          margin-left: calc(1.875rem * ${parentLevel});
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

        .status {
          position: absolute;
          left: calc(-1.125rem);
          top: 50%;
          transform: translate(-50%, -50%);
          width: 0.875rem;
          height: 0.875rem;
          z-index: 10;
        }

        .icon {
          width: 1.5rem;
          height: 100%;
          margin-right: 0.5rem;
        }

        .status,
        .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
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

        .content {
          display: flex;
          flex-direction: column;
          height: auto;
        }
      `}</style>
    </div>
  );
};
