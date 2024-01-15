const schema = [];

const create = (context) => ({
  MixedTypeAnnotation(node) {
    context.report({
      message: 'Unexpected use of mixed type',
      node,
    });
  },
});

export default {
  create,
  schema,
};
