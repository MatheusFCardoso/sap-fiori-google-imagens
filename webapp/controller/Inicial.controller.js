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

    return Controller.extend("googleimagens.controller.Inicial", {
      onInit: function () {},

      Buscar: function () {
        let inpValue = this.byId("inpBuscar").getValue();

        const settings = {
          async: true,
          crossDomain: true,
          url:
            "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" +
            inpValue +
            "&pageNumber=1&pageSize=50&autoCorrect=true",
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "0f16106c98msh33d8fed993c6145p18b051jsna2d5efdbdb7b",
            "X-RapidAPI-Host":
              "contextualwebsearch-websearch-v1.p.rapidapi.com",
          },
        };

        $.ajax(settings).done(
          function (response) {
            let ImageData = [];
            response.value.forEach((element) => {
              let item = {
                title: element.title,
                url: element.url,
                webpageUrl: element.webpageUrl,
                name: element.provider.name,
              };
              ImageData.push(item);
            });
            let ImageModel = new JSONModel(ImageData);
            //ImageModel.refresh();
            let view = this.getView();
            view.setModel(ImageModel, "GetImage");
          }.bind(this)
        );
      },

      closeDialog: function () {
        this.byId("FragmentImage").close();
      },

      ZoomImage: function (oControlEvent) {
        //window.open(oControlEvent.getSource().data("imageUrl"));
        let imagemUrl = oControlEvent.getSource().data("imageUrl");
        let title = oControlEvent.getSource().data("title");
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "googleimagens.view.Image",
          });
        }
        this.pDialog.then(
          function (oDialog) {
            const oTextModel = new JSONModel({
              url: imagemUrl,
              title : title,
            });
            oDialog.setModel(oTextModel, "imagen");

            oDialog.open();
          }.bind()
        );
      },
    });
  }
);
