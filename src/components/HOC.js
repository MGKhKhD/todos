import React from "react";

export const withCondition = BaseComponent => ({ condition, ...props }) =>
  condition ? <BaseComponent {...props} /> : null;

export const withMappedProps = mappingFunc => BasicComponent => ({
  items,
  filteredCondition,
  ...rest
}) => {
  const mappedProps = mappingFunc({ items, filteredCondition });
  return <BasicComponent {...mappedProps} {...rest} />;
};
