// @flow
import _ from 'lodash';
import type { Rule$Create } from 'eslint';

import { suppressionTypes } from '../utilities';

const FLOW_STRICT_MATCHER = /^\s*@(?:no)?flow\s*strict(?:-local)?\s*$/u;

const isStrictFlowFile = (context) => context
  .getAllComments()
  .some((comment) => FLOW_STRICT_MATCHER.test(comment.value));

const message = 'No suppression comments are allowed in "strict" Flow files. Either remove the error suppression, or lower the strictness of this module.';

const schema = [
  {
    additionalProperties: false,
    properties: ({}: { [key: string]: {| type: 'boolean' |}}),
    type: 'object',
  },
];

suppressionTypes.forEach((o) => {
  schema[0].properties[o] = {
    type: 'boolean',
  };
});

const create: Rule$Create = (context) => {
  const suppressionOptions = _.get(context, 'options[0]', {});

  if (!isStrictFlowFile(context)) {
    // Skip this file - nothing to check here
    return {};
  }

  return {
    Program: () => {
      const comments = context
        .getSourceCode()
        .getAllComments()
        .filter((node) => node.type === 'Block' || node.type === 'Line');

      for (const commentNode of comments) {
        const comment = commentNode.value.trimStart();
        const match = suppressionTypes.some((prefix) => {
          if (suppressionOptions[prefix] === false) return false;

          return comment.startsWith(prefix);
        });
        if (match) {
          context.report({
            message,
            node: commentNode,
          });
        }
      }
    },
  };
};

export default {
  create,
  schema,
};
