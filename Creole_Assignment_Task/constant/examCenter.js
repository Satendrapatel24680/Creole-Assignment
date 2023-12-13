const centerRequest = {
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED'
};

const requestStatus = {
  REQUEST_PENDING: 'Pending',
  REQUEST_COMPLETED: 'Submission Pending',
  REQUEST_APPROVAL: 'Approval Pending',
  REQUEST_REJECT: 'Rejected',
  REQUEST_CHANGE: 'Change Requested',
  APPROVAL_FINAL: 'Approved',
  ASSIGN_PENDING: 'Assign Auditor Pending',
  AUDIT_PENDING: 'Audit Pending',
  AUDIT_COMPLETED: 'Audit Completed',
  APPROVAL_CHANGE: 'Change Requested',
  APPROVAL_REJECT: 'Change Request Rejected',
  RE_ASSIGN: 'Re Audit Pending'
};

const maxStep = 8;

const organizationType = {
  kycProprietorship: 'Proprietorship',
  kycPartnership: 'Partnership',
  kycCompany: 'Pvt Ltd/Public Limited',
  kycTrust: 'Trust',
  kycSociety: 'Society'
};

const step = {
  BASIC_DETAILS: 'BasicDetails',
  DESKTOP_DETAILS: 'DesktopDetails',
  NETWORK_DETAILS: 'NetworkDetails',
  POWER_BACKUP: 'PowerBackup',
  INTERNET: 'Internet',
  OTHER_INFO: 'OtherInfo',
  KYC: 'Kyc',
  PICTURES: 'Pictures',
  COMPLETE: 'Complete',
  DELETE: 'Deleted'
};

const invigilatorType = {
  PERMANENT: 'PERMANENT',
  TEMPORARY: 'TEMPORARY',
  BOTH: 'BOTH'
};

const labLocation = {
  SAME: 'SAME BUILDING',
  DIFFERENT: 'DIFFERENT BUILDING'
};

const osType = ['WINDOW 7 32BIT', 'WINDOW 7 64BIT', 'WINDOW 7 32&64BIT', 'WINDOW 8', 'WINDOW 8.1', 'WINDOW 10', 'WINDOW 11'];

const processorType = ['DUAL CORE', 'CORE 2 DUO', 'CORE i3', 'INTEL CORE i5', 'INTEL CORE i7'];

const ram = ['1 GB', '2 GB', '4 GB', '8 GB'];

const hardDisk = ['16 GB', '32 GB', '64 GB', '120 GB', '256 GB', '500 GB'];

const monitorType = ['CRT MONITOR', 'FLAT MONITOR', 'LED MONITOR', 'OLED MONITOR', 'DCP MONITOR', 'PLASMA SCREEN MONITOR'];

const monitorSize = [14.5, 15, 16, 17, 18, 18.5, 19, 20];

const networkTopology = ['STAR', 'RING', 'BUS', 'HYBRID'];

const networkSwitchtype = ['10/100 MBPS', '100/1000 MBPS'];

const cablingType = ['CAT', 'CAT 5e', 'CAT 6'];

const ipConfig = ['STATIC', 'DHCP'];

const switchType = ['MANAGEABLE', 'UNMANAGEABLE', 'BOTH', ''];

const testCenterNetwork = ['DOMAIN', 'WORKGROUP'];

const upsType = ['STAND ALONE', 'INDIVIDUAL', 'BOTH', ''];

const dgSwitchOver = ['MANUAL', 'AUTOMATIC', ''];

const internetConnection = ['BROAD BAND', 'LEASE LINE'];

const connectivityType = ['WIRED', 'WIFI'];

const printerType = ['DESKJET', 'LASER', 'BOTH', ''];

const friskingAreaType = ['COVERED', 'UNCOVERED'];

const tcaDesignation = ['PRINCIPAL', 'DIRECTOR', 'CHAIRMAN', 'HOD', 'ADMIN', 'TC OWNER', 'MANAGER'];

const kycRole = { TCA: 'TCA', IT: 'IT', NETWORK: 'NETWORK', DTCA: 'DEPUTYTCA' };

const documentType = {
  AUDITOR_CENTER: 'AUDITOR CENTER',
  EXAM_CENTER: 'EXAM CENTER',
  AUDITOR_PROFILE: 'AUDITOR PROFILE'
};

module.exports = {
  centerRequest,
  requestStatus,
  maxStep,
  organizationType,
  step,
  invigilatorType,
  labLocation,
  osType,
  processorType,
  ram,
  hardDisk,
  monitorType,
  monitorSize,
  networkSwitchtype,
  networkTopology,
  switchType,
  testCenterNetwork,
  cablingType,
  ipConfig,
  upsType,
  dgSwitchOver,
  internetConnection,
  connectivityType,
  printerType,
  friskingAreaType,
  tcaDesignation,
  kycRole,
  documentType
};
