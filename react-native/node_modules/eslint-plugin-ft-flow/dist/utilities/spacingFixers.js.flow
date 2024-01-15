export const stripSpacesBefore = (node, spaces) => (fixer) => (
  fixer.removeRange([node.range[0] - spaces, node.range[0]])
);

export const stripSpacesAfter = (node, spaces) => (fixer) => (
  fixer.removeRange([node.range[1], node.range[1] + spaces])
);

export const addSpaceBefore = (node) => (fixer) => fixer.insertTextBefore(node, ' ');

export const addSpaceAfter = (node) => (fixer) => fixer.insertTextAfter(node, ' ');

export const replaceWithSpaceBefore = (node, spaces) => (fixer) => fixer.replaceTextRange([node.range[0] - spaces, node.range[0]], ' ');

export const replaceWithSpaceAfter = (node, spaces) => (fixer) => fixer.replaceTextRange([node.range[1], node.range[1] + spaces], ' ');

export const stripSpaces = (direction, node, spaces) => {
  if (direction === 'before') {
    return stripSpacesBefore(node, spaces);
  }

  return stripSpacesAfter(node, spaces);
};

export const addSpace = (direction, node) => {
  if (direction === 'before') {
    return addSpaceBefore(node);
  }

  return addSpaceAfter(node);
};

export const replaceWithSpace = (direction, node, spaces) => {
  if (direction === 'before') {
    return replaceWithSpaceBefore(node, spaces);
  }

  return replaceWithSpaceAfter(node, spaces);
};
