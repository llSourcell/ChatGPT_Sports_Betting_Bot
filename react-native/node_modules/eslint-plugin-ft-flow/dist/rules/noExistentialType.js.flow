// Support both node types for existential type
// https://github.com/babel/babylon/issues/319
const reporter = (context) => (node) => {
  context.report({
    message: 'Unexpected use of existential type (*).',
    node,
  });
};

const create = (context) => ({
  ExistentialTypeParam: reporter(context),
  ExistsTypeAnnotation: reporter(context),
});

export default {
  create,
};
