import isSimpleType from './isSimpleType';

const complexTypesWithoutWrap = new Set([
  'TupleTypeAnnotation',
  'ObjectTypeAnnotation',
]);

export default (node) => !isSimpleType(node) && !complexTypesWithoutWrap.has(node.type);
