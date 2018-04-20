/** 
 * Main Route Contoller
 * @param {object} router
 */
module.exports = (router) => {
  router.get("/",

    (req, res) => {
      const data = {
        title: "Oh hi world!",
      };
      //console.log(req)
      //req.vueOptions.head.title = "Express-Vue MVC Starter Kit";
      res.renderVue('main/main.vue', data, req.vueOptions);
    },
  );
};