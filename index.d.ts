type networkInterfacesNameAccessConfigsListType = {
     kind: string,
      type?: string,
      name: string,
      natIP: string,
      networkTier?: string
}; 

type Disks = {
    kind: string,
      type: string
      mode: string
    
      deviceName?: string
      interface?: string,
      
      diskSizeGb: string,
      architecture: string
};
type ComputeIns = {
    id : string
    creationTimestamp : string
    name : string
    fingerprint : string
    status :string
    networkInterfacesName : string
    networkInterfacesNameAccessConfigsList : networkInterfacesNameAccessConfigsListType[]
    disks : Disks[]
    cpuPlatform : string
    deletionProtection: boolean
};