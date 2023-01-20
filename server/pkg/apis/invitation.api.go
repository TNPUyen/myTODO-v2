package apis

import (
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewInvitationAPI(server *core.Server) *echo.Group {
	api := server.Echo.Group("/api/v1/invitations")
	business := bl.NewInvitationBusinessLogic(server)

	api.GET("/byUser/:uid", func(c echo.Context) error {
		uid := c.Param("uid")
		result, err := business.GetInvitationByUser(uid)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	api.GET("/byProject/:pid", func(c echo.Context) error {
		pid := c.Param("pid")
		result, err := business.GetInvitationByProject(pid)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	api.POST("", func(c echo.Context) error {
		invitation := models.Invitation{}
		err := c.Bind(&invitation)
		if err != nil {
			return err
		}
		err = business.CreateInvitation(&invitation)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, invitation)
	})

	api.PUT("/:id", func(c echo.Context) error {
		invitation := models.Invitation{}
		err := c.Bind(&invitation)
		if err != nil {
			return err
		}
		err = business.UpdateInvitation(&invitation)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, invitation)
	})

	api.DELETE("/:id", func(c echo.Context) error {
		invitationId := c.Param("id")
		err := business.DeleteInvitation(invitationId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, invitationId)
	})

	return api
}
