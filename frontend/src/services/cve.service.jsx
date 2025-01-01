import { api } from "./api";
import { API_ENDPOINTS } from "@/utils/config";


export const cveService = {
    getVulnerabilities,
    getVulnerabilityByCve,
    getVulnerabilityByVendor,
};


function getVulnerabilities(){
    return api.get(API_ENDPOINTS.GetAll);
}

function getVulnerabilityByCve(cveId){
    return api.get(API_ENDPOINTS.GetVulnerabilityByCve(cveId));
}

function getVulnerabilityByVendor(vendor){
    return api.get(API_ENDPOINTS.GetByVendor(vendor));
}





