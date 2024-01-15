// @flow
import type { Rule$Create } from 'eslint';
import _ from 'lodash';

const schema = [
  {
    additionalProperties: false,
    properties: {
      any: {
        type: 'boolean',
      },
      Function: {
        type: 'boolean',
      },
      Object: {
        type: 'boolean',
      },
      suppressTypes: {
        items: {
          type: 'string',
        },
        type: 'array',
      },
    },
    type: 'object',
  },
];

const reportWeakType = (context, weakType, custom = false) => (node) => {
  context.report({
    data: { weakType },
    message: `Unexpected use of${custom ? ' custom' : ''} weak type "{{weakType}}"`,
    node,
  });
};

const genericTypeEvaluator = (
  context,
  {
    checkFunction,
    checkObject,
    suppressTypes,
  },
) => (node) => {
  const name = _.get(node, 'id.name');

  if ((checkFunction && name === 'Function') || (checkObject && name === 'Object')) {
    reportWeakType(context, name)(node);
  }
  if (suppressTypes.includes(name)) {
    reportWeakType(context, name, true)(node);
  }
};

const create: Rule$Create = (context) => {
  const checkAny = _.get(context, 'options[0].any', true) === true;
  const checkFunction = _.get(context, 'options[0].Function', true) === true;
  const checkObject = _.get(context, 'options[0].Object', true) === true;
  const suppressTypes = _.get(context, 'options[0].suppressTypes', []);

  const checks = {};

  if (checkAny) {
    checks.AnyTypeAnnotation = reportWeakType(context, 'any');
  }

  if (checkFunction || checkObject || suppressTypes.length > 0) {
    checks.GenericTypeAnnotation = genericTypeEvaluator(context, {
      checkFunction,
      checkObject,
      suppressTypes,
    });
  }

  return checks;
};

export default {
  create,
  schema,
};
