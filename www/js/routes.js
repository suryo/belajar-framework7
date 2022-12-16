var routes = [
  {
    path: "/",
    url: "./index.html",
  },
  {
    path: "/about/",
    url: "./pages/about.html",
  },
  {
    path: "/form/",
    url: "./pages/form.html",
  },
  {
    path: "/catalog/",
    componentUrl: "./pages/catalog.html",
  },
  {
    path: "/product/:id/",
    componentUrl: "./pages/product.html",
  },
  {
    path: "/settings/",
    url: "./pages/settings.html",
  },
  {
    path: "/testpage/",
    url: "./pages/testpage.html",
    on: {
      pageAfterIn: function test(e, page) {
        // do something after page gets into the view
      },
      pageInit: function (e, page) {
        console.log("page init");
        app.request
          .get("http://belajarlaravel.brainwarehub.com/public/api/getnewsapi")
          .then(function (res) {
            var res = JSON.parse(res.data)
            console.log(res[0].tittle);
            
          })
          .catch(function (err) {
            console.log(err.xhr);
            console.log(err.status);
            console.log(err.message);
          });
      },
    },
  },
  {
    path: "/testpage2/",
    componentUrl: "./pages/testpage2.html",
  },

  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    componentUrl: "./pages/dynamic-route.html",
  },
  {
    path: "/request-and-load/user/:userId/",
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: "Vladimir",
          lastName: "Kharlampidi",
          about: "Hello, i am creator of Framework7! Hope you like it!",
          links: [
            {
              title: "Framework7 Website",
              url: "http://framework7.io",
            },
            {
              title: "Framework7 Forum",
              url: "http://forum.framework7.io",
            },
          ],
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: "./pages/request-and-load.html",
          },
          {
            props: {
              user: user,
            },
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: "(.*)",
    url: "./pages/404.html",
  },
];
