import { Weakness, Configuration, Reference, Metric } from ".."

const mapMetrics = (cve: any): Metric[] | undefined => {
    return cve.metrics?.cvssMetricV2?.flatMap((metric: any) => ({
        source: metric.source,
        baseScore: metric.cvssData.baseScore,
        severity: metric.baseSeverity,
        exploitabilityScore: metric.exploitabilityScore,
        impactScore: metric.impactScore,
        vector: metric.cvssData.vectorString,
    }));
};

  const mapReferences = (cve: any): Reference[] | undefined => {
      return cve.references?.flatMap((reference: any) => ({
          url: reference.url,
      }));
  };



  const mapAffected = (cve: any): Configuration[] | undefined => {
    const nodes = cve.configurations?.[0]?.nodes;
    
    // Vérifiez d'abord si "nodes" est défini et s'il contient plus d'un élément
    if (nodes && nodes.length > 1) {
        // Exclure le premier élément de "nodes" en utilisant slice(1)
        return nodes.slice(1).flatMap((node: any) => (
            node.cpeMatch.map((cpeMatch: any) => ({ cpe: cpeMatch.criteria }))
        ));
    }
    
    return undefined; // Retournez undefined si aucun ou un seul élément dans "nodes"
};


const mapWeaknesses = (cve: any): Weakness[] | undefined => {
  return cve.weaknesses?.map((weakness: any) => ({
      description: weakness.description.flatMap((desc: any) => desc.value).join(' '),
  }));
  };


export { mapMetrics, mapReferences, mapAffected, mapWeaknesses };