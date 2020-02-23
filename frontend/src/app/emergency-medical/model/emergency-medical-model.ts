export class EmergencyMedical {
    emergencyAddress: string;
    emergencyCategory: string;
    emergencyName: string;
    emergencyTel1: string;
    emergencyTel3: string;
    emergencyId: string;
    emergencyPhpId: string;
    emergencyInfo: string;
    medicalList: string;

    constructor(
        emergencyAddress,
        emergencyCategory,
        emergencyName,
        emergencyTel1,
        emergencyTel3,
        emergencyId,
        emergencyPhpId,
        emergencyInfo,
        medicalList
    ) {
        this.emergencyAddress = emergencyAddress;
        this.emergencyCategory = emergencyCategory;
        this.emergencyName = emergencyName;
        this.emergencyTel1 = emergencyTel1;
        this.emergencyTel3 = emergencyTel3;
        this.emergencyId = emergencyId;
        this.emergencyPhpId = emergencyPhpId;
        this.emergencyInfo = emergencyInfo;
        this.medicalList = medicalList;
    }
}