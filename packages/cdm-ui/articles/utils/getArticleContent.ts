export function getArticleContent(body: any) {
  const unblocked = body.map(block => {
    const b = block;

    if (b['__template']) {
      delete b.template;
    }

    return Object.keys(b).map(key => JSON.stringify(b[key])).join(" ");
  }).join(" ");

  return unblocked;
}