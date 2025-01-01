import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { cveService } from "@/services";

export default function useVulnerabilities() {
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const { data,isFetched, isLoading: isQueryLoading, error }  = useQuery(['vulnerabilities'], () => cveService.getVulnerabilities(), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false),
    });


    useEffect(() => {
        if (isFetched) {
            const formatedData = formatVulnerabilities(data);
            if (formatedData) { // Vérifiez si formatedData est défini avant de l'utiliser
                setVulnerabilities(formatedData);
                setIsLoading(false);
            }
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
    const formattedData = data.map((vuln) => ({
        CveID: vuln.cveId,
        Vendor: vuln.vendor,
        Description: vuln.description,
        Product: vuln.product,
        Severity: vuln.metrics[0]?.severity ?? 'not available',
        Gravity: vuln.metrics[0]?.baseScore ?? 'N/A',
        Publication_date: vuln.published,
        Last_update: vuln.lastModified
    }));

    return formattedData;
}
