
import { titles, vendors, products, descriptions, vectors, solutions } from "./_data";

const _cveMock = {
  id: (index) => `CVE-${2023}-${index}`,
  title: (index) => titles[index],
  description: (index) => descriptions[index],
  product: (index) => products[index],
  vendor: (index) => vendors[index],
  severity: (index) => ["low", "medium", "high"][index % 3],
  cvss: (index) => ({ score: (index + 1) * 2, vector: vectors[index] }),
  references: (index) => [{ 
    url: "https://cve.mitre.org/",
    description: descriptions[index]
  }],
  // fixed date for each object
  publication: (index)=> `2023-01-0${index + 1}`,
  fix: (index) => index % 2 === 0 ? true : false,
  solution: (index) => solutions[index]
};

export default _cveMock;