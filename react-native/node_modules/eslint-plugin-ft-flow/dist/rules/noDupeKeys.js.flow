import _ from 'lodash/';

import {
  getParameterName,
} from '../utilities';

const schema = [];

const create = (context) => {
  const report = (node) => {
    context.report({
      loc: node.loc,
      message: 'Duplicate property.',
      node,
    });
  };

  const analyzeElement = (element) => {
    const { type } = element;
    let value;

    switch (type) {
      case 'GenericTypeAnnotation':
        value = element.id.name;
        break;
      case 'ObjectTypeAnnotation':
      // eslint-disable-next-line no-use-before-define
        value = buildObjectStructure(element.properties);
        break;
      case 'TupleTypeAnnotation':
      // eslint-disable-next-line no-use-before-define
        value = buildArrayStructure(element.types);
        break;
      default:
        value = element.value;
        break;
    }

    return {
      type,
      value,
    };
  };

  const buildArrayStructure = (elements) => _.map(elements, (element) => analyzeElement(element));

  const buildObjectStructure = (properties) => _.map(properties, (property) => {
    const element = analyzeElement(
      property.type === 'ObjectTypeSpreadProperty'
        ? property.argument
        : property.value,
    );

    return {
      ...element,
      name: getParameterName(property, context),
    };
  });

  const checkForDuplicates = (node) => {
    const haystack = [];

    // filter out complex object types, like ObjectTypeSpreadProperty
    const identifierNodes = _.filter(node.properties, { type: 'ObjectTypeProperty' });

    for (const identifierNode of identifierNodes) {
      const needle = { name: getParameterName(identifierNode, context) };

      if (identifierNode.value.type === 'FunctionTypeAnnotation') {
        needle.args = _.map(
          identifierNode.value.params,
          (param) => analyzeElement(param.typeAnnotation),
        );
      }

      const match = _.some(haystack, (existingNeedle) => _.isEqual(existingNeedle, needle));

      if (match) {
        report(identifierNode);
      } else {
        haystack.push(needle);
      }
    }
  };

  return {
    ObjectTypeAnnotation: checkForDuplicates,
  };
};

export default {
  create,
  schema,
};
