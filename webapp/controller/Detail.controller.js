sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("googleimagens.controller.Detail", {
      onInit: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (oEvent) {
        console.log("aqui 00");
        var oArgs, oView;
        oArgs = oEvent.getParameter("arguments");
        oView = this.getView();
        console.log(oArgs)
      },

      handleNavButtonPress: function (evt) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("RouteInicial");
      },
    });
  }
);
