import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { cveService } from '@/services';

export default function useVendors(vendor) {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading: isQueryLoading, error } = useQuery(
    ['vulnerabilities', vendor],
    () => cveService.getVulnerabilityByVendor(vendor),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!vendor,
    }
  );

  useEffect(() => {
    if (data) {
      const formattedData = formatVulnerabilities(data);
      setVulnerabilities(formattedData);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(isQueryLoading);
  }, [isQueryLoading]);

  useEffect(() => {
    if (error) {
      console.error('Error in useVulnerabilities:', error);
    }
  }, [error]);

  return { vulnerabilities, isLoading };
}

function formatVulnerabilities(data) {
  return data.map((vuln) => ({
    CveID: vuln.cveId,
    Vendor: vuln.vendor,
    Description: vuln.description,
    Product: vuln.product,
    Severity: vuln.metrics[0]?.severity ?? 'not available',
    Gravity: vuln.metrics[0]?.baseScore ?? 'N/A',
    Publication_date: vuln.published,
    Last_update: vuln.lastModified,
  }));
}
