var app;
(function (app) {
    var Services;
    (function (Services) {
        var PostService = (function () {
            function PostService($resource) {
                this.$resource = $resource;
                this.PostResource = $resource('/api/posts/fileUpload');
            }
            PostService.prototype.savePost = function (file) {
                console.log("FROM SERVICES ", file);
                return this.PostResource.save(file).$promise;
            };
            return PostService;
        }());
        Services.PostService = PostService;
        var UserService = (function () {
            function UserService($window, $resource) {
                this.$window = $window;
                this.$resource = $resource;
                this.status = {
                    _id: null,
                    email: null,
                    role: null
                };
                this.RegisterResource = $resource('/api/users/register');
                this.LoginResource = $resource('/api/users/login');
                this.UserResource = $resource('/api/users/userProfile');
                this.EditResource = $resource('/api/users/editProfile');
            }
            UserService.prototype.register = function (user) {
                return this.RegisterResource.save(user).$promise;
            };
            UserService.prototype.login = function (user) {
                var _this = this;
                return this.LoginResource.save(user).$promise.then(function (res) {
                    _this.setToken(res['token']);
                    _this.setUser();
                    console.log("This is controller: " + user);
                });
            };
            UserService.prototype.setUser = function () {
                var u = JSON.parse(this.urlBase64Decode(this.getToken().split('.')[1]));
                this.status._id = u._id;
                this.status.email = u.email;
                this.status.role = u.role;
            };
            ;
            UserService.prototype.getUser = function () {
                return this.UserResource.query();
            };
            UserService.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            UserService.prototype.setToken = function (token) {
                this.$window.localStorage.setItem('token', token);
            };
            UserService.prototype.urlBase64Decode = function (str) {
                var output = str.replace(/-/g, '+').replace(/_/g, '/');
                switch (output.length % 4) {
                    case 0: {
                        break;
                    }
                    case 2: {
                        output += '==';
                        break;
                    }
                    case 3: {
                        output += '=';
                        break;
                    }
                    default: {
                        throw 'Illegal base64url string!';
                    }
                }
                return decodeURIComponent(encodeURIComponent(this.$window.atob(output)));
            };
            UserService.prototype.editUser = function (newInfo) {
                console.log(newInfo);
                return this.EditResource.save(newInfo).$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('app').service('userService', UserService);
        angular.module('app').service('postService', PostService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFVLEdBQUcsQ0EwRlo7QUExRkQsV0FBVSxHQUFHO0lBQUMsSUFBQSxRQUFRLENBMEZyQjtJQTFGYSxXQUFBLFFBQVEsRUFBQyxDQUFDO1FBQ3RCO1lBRUUscUJBQW9CLFNBQXVDO2dCQUF2QyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtnQkFFeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtZQUN6RCxDQUFDO1lBRU0sOEJBQVEsR0FBZixVQUFnQixJQUFJO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQy9DLENBQUM7WUFFSCxrQkFBQztRQUFELENBQUMsQUFaRCxJQVlDO1FBWlksb0JBQVcsY0FZdkIsQ0FBQTtRQUVEO1lBOERFLHFCQUNVLE9BQTBCLEVBQzFCLFNBQXVDO2dCQUR2QyxZQUFPLEdBQVAsT0FBTyxDQUFtQjtnQkFDMUIsY0FBUyxHQUFULFNBQVMsQ0FBOEI7Z0JBMUQxQyxXQUFNLEdBQUc7b0JBQ2QsR0FBRyxFQUFFLElBQUk7b0JBQ1QsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFLElBQUk7aUJBQ1gsQ0FBQTtnQkF1REMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO2dCQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO2dCQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO2dCQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FB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