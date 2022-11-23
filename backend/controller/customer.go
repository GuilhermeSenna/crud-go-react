 package controller 

 import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/guilhermeSenna/golang-api-test/config"
	"github.com/guilhermeSenna/golang-api-test/models"
	"github.com/guilhermeSenna/golang-api-test/utils"
	"encoding/json"
	"gorm.io/gorm"
)


 func GetCustomer(c *gin.Context){
	var customer models.Customers
	err := config.DB.Where("id = ?", c.Param("id")).First(&customer).Error

	// Check if has generate an error with the query
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, "Customer not found!")
		return
	}else if err != nil {
		c.JSON(500, "Unknown error")
		return
	}

	c.JSON(200, &customer) 
 }

 func GetCustomers(c *gin.Context){
	customers := []models.Customers{}
	// Limit to 50 users
	err := config.DB.Limit(50).Find(&customers).Error

	if err != nil {
		c.JSON(500, "Unknown error")
		return
	}

	c.JSON(200, &customers)
 }

 func CreateCustomer(c *gin.Context){
	// Get customer parameters
	var customer models.Customers
	decoder := json.NewDecoder(c.Request.Body)
	decoder.Decode(&customer)

	// Hash password
	hashPassword, _ := utils.HashPassword(customer.Password)
	customerFormatted := models.Customers{
		FirstName:     customer.FirstName,
		LastName:      customer.LastName,
		Email:     customer.Email,
		Password:  hashPassword,
	}

	// Add to database
	err := config.DB.Create(&customerFormatted).Error

	if err != nil {
		c.JSON(500, "Unknown error")
		return
	}

	c.JSON(201, customerFormatted)
 }

 func UpdateCustomer(c *gin.Context){
	// Get customer parameters
	var customer, checkCustomer models.Customers
	decoder := json.NewDecoder(c.Request.Body)
	decoder.Decode(&customer)

	// Check if user exists
	errCheckCustomer := config.DB.Where("id = ?", c.Param("id")).First(&checkCustomer).Error

	// Check if has generate an error with the query
	if errors.Is(errCheckCustomer, gorm.ErrRecordNotFound) {
		c.JSON(404, "Customer not found!")
		return
	}else if errCheckCustomer != nil {
		c.JSON(500, "Unknown error - check customer")
		return
	}

	// Hash password
	hashPassword, _ := utils.HashPassword(customer.Password)
	customerFormatted := models.Customers{
		FirstName:     customer.FirstName,
		LastName:      customer.LastName,
		Email:     customer.Email,
		Password:  hashPassword,
	}

	// Update customer
	errUpdateCustomer := config.DB.Where("id = ?", c.Param("id")).Updates(&customerFormatted).Error

	if errUpdateCustomer != nil {
		c.JSON(500, "Unknown error - update customer")
		return
	}

	c.JSON(200, "OK")
 }

 func DeleteCustomer(c *gin.Context){
	// Get customer parameters
	var customer models.Customers

	// Check if user exists
	errCheckCustomer := config.DB.Where("id = ?", c.Param("id")).First(&customer).Error

	// Check if has generate an error with the query
	if errors.Is(errCheckCustomer, gorm.ErrRecordNotFound) {
		c.JSON(404, "Customer not found!")
		return
	}else if errCheckCustomer != nil {
		c.JSON(500, "Unknown error - check customer")
		return
	}

	// Update customer
	errUpdateCustomer := config.DB.Where("id = ?", c.Param("id")).Delete(&customer).Error

	if errUpdateCustomer != nil {
		c.JSON(500, "Unknown error - delete customer")
		return
	}

	c.JSON(200, "OK")
 }