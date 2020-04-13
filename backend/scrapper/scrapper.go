package scrapper

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/chulphan/emergency-medical/backend/util"
	"github.com/labstack/echo"
)

type HospitalDetail struct {
	MedicalList   string `xml:"body>items>item>dgidIdName"`
	MedicalInfo   string `xml:"body>items>item>dutyInf"`
	MedicalMapimg string `xml:"body>items>item>dutyMapimg"`
}

type HospitalItem struct {
	HospitalAddress  string `xml:"dutyAddr"`
	HospitalCategory string `xml:"dutyEmclsName"`
	HospitalName     string `xml:"dutyName"`
	HospitalTel1     string `xml:"dutyTel1"`
	HospitalTel3     string `xml:"dutyTel3"`
	HospitalId       string `xml:"hpid"`
	MedicalList      string
	MedicalInfo      string
	MedicalMapimg    string
}

func (h *HospitalItem) AddMedicalDetailInfo(medicalDetailInfo *HospitalDetail) HospitalItem {
	h.MedicalList = medicalDetailInfo.MedicalList
	h.MedicalInfo = medicalDetailInfo.MedicalInfo
	h.MedicalMapimg = medicalDetailInfo.MedicalMapimg
	hospitalItemAddedMedicalList := h
	return *hospitalItemAddedMedicalList
}

type Result struct {
	HospitalItems []HospitalItem `xml:"body>items>item"`
	TotalCount    int            `xml:"body>totalCount"`
	NumOfRows     int            `xml:"body>numOfRows"`
}

func EmergencyScrapper(c echo.Context) error {
	var baseURL = "http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytListInfoInqire?serviceKey=" + os.Getenv("EMERGENCY_KEY")

	resp, err := http.Get(baseURL)
	util.CheckError(err)

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	util.CheckError(err)

	v := Result{TotalCount: 0}

	err = xml.Unmarshal(body, &v)
	util.CheckError(err)

	var totalRequest = 0
	if v.TotalCount%10 > 0 {
		totalRequest = v.TotalCount/10 + 1
	} else {
		totalRequest = v.TotalCount
	}
	fmt.Println(totalRequest)
	resultChan := make(chan []HospitalItem)

	hospitalList := make([]HospitalItem, 0)

	for i := 0; i < 5; i++ {
		go getHospitalItemsByNumRow(baseURL, i, resultChan)
		time.Sleep(time.Second / 2)
	}

	for i := 0; i < 5; i++ {
		hospitalList = append(hospitalList, <-resultChan...)
	}

	detailChan := make(chan *HospitalDetail)

	for _, hospital := range hospitalList {
		go getMedicalListEachHospital(hospital.HospitalId, detailChan)
		time.Sleep(time.Second / 2)
	}

	addedDetailHospitalList := make([]HospitalItem, 0)

	for _, hospital := range hospitalList {
		_detailChan := <-detailChan
		addedDetailHospitalList = append(addedDetailHospitalList, hospital.AddMedicalDetailInfo(_detailChan))
	}

	for _, a := range addedDetailHospitalList {
		fmt.Println(a)
	}

	return nil
}

func getHospitalItemsByNumRow(baseURL string, pageNo int, c chan<- []HospitalItem) {
	targetURL := baseURL + "&pageNo=" + strconv.Itoa(pageNo+1)
	resp, err := http.Get(targetURL)
	util.CheckError(err)

	body, err := ioutil.ReadAll(resp.Body)
	util.CheckError(err)

	defer resp.Body.Close()

	result := Result{}

	err = xml.Unmarshal(body, &result)
	util.CheckError(err)
	fmt.Println(targetURL, ": ", result.NumOfRows)
	c <- result.HospitalItems
}

func getMedicalListEachHospital(hospitalId string, detailChan chan<- *HospitalDetail) {
	targetURL := "http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytBassInfoInqire?serviceKey=" + os.Getenv("EMERGENCY_KEY") + "&HPID=" + hospitalId

	resp, err := http.Get(targetURL)
	util.CheckError(err)

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	util.CheckError(err)

	medicalList := &HospitalDetail{}
	err = xml.Unmarshal(body, &medicalList)

	detailChan <- medicalList
}
