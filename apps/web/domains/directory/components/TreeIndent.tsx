import React from "react";

interface Props {
  count: unknown;
}

export const TreeIndent: React.FC<Props> = ({ count }) => {
  if (count === 0) return null;
  return (
    <>
      {[...new Array(count)].map((_, index) => (
        <span className="indent" key={`indent-${index}`}>
          <style jsx>{`
            span.indent {
              left: calc(-1.875rem * ${index + 1} + 0.75rem);
            }
          `}</style>
        </span>
      ))}
    </>
  );
};
