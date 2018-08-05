/* eslint dot-notation: 0 */
const Schema = {
  name: 'Category',
  fields: {
    name: 'name',
  },
};

const New = (name = '', id = undefined) => (
  (id) ? {
    id,
    name,
  } : {
    name,
  }
);

const CreateFromBodyRequest = (body) => {
  if (body.name !== undefined && body.name !== '') {
    return New(body.name);
  }
  return undefined;
};

const CreateFromDocument = categoryDocument => (
  New(categoryDocument.name, categoryDocument['_id'])
);

const CreateFromDocuments = categoryDocuments => (
  categoryDocuments.map(doc => CreateFromDocument(doc))
);

module.exports = {
  Schema,
  New,
  CreateFromBodyRequest,
  CreateFromDocument,
  CreateFromDocuments,
};
