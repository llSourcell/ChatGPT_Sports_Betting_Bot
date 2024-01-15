import { suppressionTypes } from '../utilities';

const schema = [
  {
    type: 'string',
  },
];

const message = (suppression = '') => `${suppression} is missing a suppression error code. Please update this suppression to use an error code: ${suppression}[…]`;

const create = (context) => {
  const isMissingSuppressionCode = (value) => {
    let failedType;
    suppressionTypes.forEach((cur) => {
      if (value
          && value.startsWith(cur)
          && !value.startsWith(`${cur}[`)
          && !value.endsWith(']')) {
        failedType = cur;
      }
    });

    return failedType;
  };

  const handleComment = (comment) => {
    const value = comment.type === 'Block'
      ? comment.value.replace(/\*/g, '')
      : comment.value;
    const suppression = value.trim().split(' ').filter((arg) => arg.length > 0)[0];
    const failedType = isMissingSuppressionCode(suppression);

    if (failedType) {
      context.report(comment, message(failedType));
    }
  };

  return {
    Program() {
      context
        .getSourceCode()
        .getAllComments()
        .filter((comment) => comment.type === 'Block' || comment.type === 'Line')
        .forEach(handleComment);
    },
  };
};

export default {
  create,
  schema,
};
