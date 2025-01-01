import _cveMock from './_mock';

export const _randomCVEs = [...Array(20)].map((_, index) => ({
  id: _cveMock.id(index),
  title: _cveMock.title(index),
  description: _cveMock.description(index),
  product: _cveMock.product(index),
  vendor: _cveMock.vendor(index),
  severity: _cveMock.severity(index),
  cvss: _cveMock.cvss(index),
  published: _cveMock.publication(index),
  references: _cveMock.references(index),
  fix: _cveMock.fix(index),
  solution: _cveMock.solution(index)
}));
