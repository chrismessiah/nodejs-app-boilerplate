'use strict';

exports.getRouter = function getRouter(router, controller) {
  router.route('/')
    .get(controller.pages.index.get);
  router.route('/about')
    .get(controller.pages.about.get);

  router.route('/login/')
    .get(controller.actions.login);
  router.route('/signup/')
    .get(controller.actions.signup);
  router.route('/user/:id')
    .get(controller.actions.getUser);
  return router;
};
