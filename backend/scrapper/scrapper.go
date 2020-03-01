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

type HospitalItem struct {
	HospitalAddress  string `xml:"dutyAddr"`
	HospitalCategory string `xml:"dutyEmclsName"`
	HospitalName     string `xml:"dutyName"`
	HospitalTel1     string `xml:"dutyTel1"`
	HospitalTel3     string `xml:"dutyTel3"`
	HospitalId       string `xml:"hpid"`
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

	resultChan := make(chan Result)

	hospitalList := make([]Result, 0)

	for i := 0; i < totalRequest; i++ {
		go getHospitalItemsByNumRow(baseURL, i, resultChan)
		time.Sleep(time.Second)
	}

	for i := 0; i < totalRequest; i++ {
		hospitalList = append(hospitalList, <-resultChan)
	}

	for i, a := range hospitalList {
		fmt.Println(i, ": ", a.HospitalItems)
	}

	return nil
}

func getHospitalItemsByNumRow(baseURL string, pageNo int, c chan<- Result) {
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
	c <- result
}
