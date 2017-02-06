'use strict';

exports.getRouter = function getRouter(router, controller) {
  router.route('/')
    .get(controller.controller1.subController1.foo);
  router.route('/login/')
    .get(controller.controller1.subController2.foo);
  router.route('/signup/')
    .get(controller.controller2.signup);
  router.route('/user/:id')
    .get(controller.controller2.getUser);
  return router;
};
