export const API = "http://127.0.0.1:4000/api/v1";

export const API_ENDPOINTS = {

    All: (page, limit) => `${API}/vulnerabilities?page=${page}&limit=${limit}`,
    GetVulnerabilityByCve: (cveId) => `${API}/vulnerabilities/cve/${cveId}`,
    GetByVendor: (vendorName) => `${API}/vulnerabilities/vendor/${vendorName}`,
    GetAll: `${API}/vulnerabilities`,
    GetVendors: `${API}/vendors`,
}

// LAYOUT
export const HEADER = {
    MOBILE_HEIGHT: 64,
    MAIN_DESKTOP_HEIGHT: 88
};


export const NAVBAR = {
    BASE_WIDTH: 260,
    DASHBOARD_WIDTH: 280,
    DASHBOARD_COLLAPSE_WIDTH: 88,
    //
    DASHBOARD_ITEM_ROOT_HEIGHT: 48,
    DASHBOARD_ITEM_SUB_HEIGHT: 40,
    DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
    NAVBAR_ITEM: 22,
    NAVBAR_ITEM_HORIZONTAL: 20,
};


export const IMAGE = {
    ReferenceStackCheck: 'https://nvd.nist.gov/site-media/images/NVD_Reference_Stack_Check.svg',
    emptyContent: '/img/illustration_empty_content.svg',
    bug: '/img/bug.svg',
    iot: '/img/iot.svg',
    shied: '/img/shield.svg',

};
