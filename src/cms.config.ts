import { CmsConfig, Entity, Form } from "@chrisdmacrae/teditor";

const articles: Entity = {
  name: 'article',
  getSlug: async (id) => {
    return '';
  },
  all: async () => {
    return [{ foo: "bar" }];
  },
  get: async (id) => {
    return { foo: "bar" };
  },
  forms: (entity: Record<string, any>) => [
    new Form({
      name: 'article',
      label: "Article",
      initialValues: entity,
      fields: [],
      onSubmit: (values) => console.log(values)
    })
  ]
}

export default {
  entities: [
    articles
  ]
} as CmsConfig;