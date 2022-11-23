package routes

import(
	"github.com/gin-gonic/gin"
	"github.com/guilhermeSenna/golang-api-test/controller"
)


func Routes(router *gin.Engine) {

	customersRoutes := router.Group("/customers")
	{
		// Returns an array of up to 50 customers
		customersRoutes.GET("/", controller.GetCustomers)

		// Returns a specific customer
		customersRoutes.GET("/:id", controller.GetCustomer)

		// Creates a new customer
		customersRoutes.POST("/", controller.CreateCustomer)

		// Updates a customer
		customersRoutes.PUT("/:id", controller.UpdateCustomer)

		// Delete a customer
		customersRoutes.DELETE("/:id", controller.DeleteCustomer)
	}


}