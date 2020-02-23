package main

import (
	"context"
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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

const (
	DB_URI     = "mongodb://localhost:27017"
	NUM_OF_ROW = 4
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.GET("/api/v1/hospitals", FetchHospitals)
	e.GET("/api/v1/hospitals/:id", FetchHospital)

	e.Logger.Fatal(e.Start(":1323"))
}

func FetchHospitals(c echo.Context) error {

	clientOptions := options.Client().ApplyURI(DB_URI)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	offset := c.QueryParam("offset")
	findOptions := options.Find()
	offsetStr, _ := strconv.ParseInt(offset, 10, 64)
	findOptions.SetSkip(offsetStr)
	findOptions.SetLimit(NUM_OF_ROW)

	collection := client.Database("emergency").Collection("emergency_list")

	var emergencyList []*Emergency

	cur, err := collection.Find(context.TODO(), bson.M{}, findOptions)

	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var elem Emergency
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
		emergencyList = append(emergencyList, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	return c.JSON(http.StatusOK, emergencyList)
}

func FetchHospital(c echo.Context) error {
	hospitalId := c.Param("id")
	clientOptions := options.Client().ApplyURI(DB_URI)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	collection := client.Database("emergency").Collection("emergency_list")

	var emergency Emergency
	result := collection.FindOne(context.TODO(), bson.M{"hptid": hospitalId})
	result.Decode(&emergency)

	return c.JSON(http.StatusOK, emergency)
}
