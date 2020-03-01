package model

type Emergency struct {
	DutyAddr      string `json:"emergencyAddress"`
	DutyEmclsName string `json:"emergencyCategory"`
	DutyName      string `json:"emergencyName"`
	DgidIdName    string `json:"medicalList"`
	DutyTel1      string `json:"emergencyTel1"`
	DutyTel3      string `json:"emergencyTel3"`
	Hptid         string `json:"emergencyId"`
	DutyInf       string `json:"emergencyInfo"`
}

func (e *Emergency) mock() *Emergency {
	return e
}
