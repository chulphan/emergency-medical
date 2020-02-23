package emergency

type Emergency struct {
	DutyAddr  string `json:"dutyAddr"`
	DutyEmcls string `json:"dutyEmcls"`
	DutyName  string `json:"dutyName"`
	DutyTel1  string `json:"dutyTel1"`
	DutyTel3  string `json:"dutyTel3"`
	Hpid      string `json:"hpid"`
	Phpid     string `json:"phpid"`
}
