package emergency

type Emergency struct {
	DutyAddr  string `json:"emergencyAddress"`
	DutyEmcls string `json:"emergencyCategory"`
	DutyName  string `json:"emergencyName"`
	DutyTel1  string `json:"emergencyTel1"`
	DutyTel3  string `json:"emergencyTel3"`
	Hpid      string `json:"emergencyId"`
	Phpid     string `json:"emergencyPhpId"`
}
