(function () {
    angular
        .module('slmsApp')
        .controller('contentModalCtrl', contentModalCtrl);
    contentModalCtrl.$inject = ['$modalInstance', '$routeParams', 'contentData', '$rootScope', '$http'];
    function contentModalCtrl($modalInstance, $routeParams, contentData, $rootScope, $http) {
        var vm = this;
        vm.courseid = $routeParams.courseid;
        vm.formError = "";
        vm.contentid = $rootScope.id;

        contentData.readContentById(vm.courseid, vm.contentid)
            .success(function (data) {
                vm.data = data;
            })
            .error(function (e) {
                console.log(e);
            });

        vm.doAddContent = function (courseid, formData) {
            contentData.addContentById(courseid, {
                name: formData.name,
                link: formData.link,
                details: formData.details
            })
                .success(function (data) {
                    vm.modal.close(data);
                    window.location.reload();
                })
                .error(function (data) {
                    vm.formError = "Try Again!!";
                });
            return false;
        };

        vm.deleteContent = function (courseid, contentid) {
            contentData.deleteContentById(courseid, vm.contentid)
                .success(function () {
                    vm.modal.close();
                    window.location.reload();
                })
                .error(function (data) {
                    vm.formError = "Error in Deletion: " +  data    ;
                });
            return false;
        };

        vm.updateContent = function (courseid, contentid, data) {
            console.log("Update details: " + data);
            contentData.updateContentById(courseid, contentid, data)
                .success(function () {
                    vm.modal.close(data);
                    window.location.reload();                
                })
                .error(function (data) {
                    vm.formError = data;
                });
            return false;
        }

        vm.modal = {
            close: function (result) {
                $modalInstance.close(result);
            },
            cancel: function () {
                $modalInstance.dismiss('cancel');
            }
        };
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.name || !vm.formData.link) {
                vm.formError = "Name and file fields required, please try again";
                return false;
            } else {
                vm.doAddContent(vm.courseid, vm.formData);

            }
        };

        vm.onDelete = function () {
            vm.deleteContent(vm.courseid, vm.contentid);
        }

        vm.onUpdate = function () {
            vm.formError = "";
            if (!vm.formData1.name || !vm.formData1.link) {
                vm.formError = "Name and file fields required, please try again";
                return false;
            } else {
                vm.updateContent(vm.courseid,vm.contentid, vm.formData1);
            }
        }

        vm.onUpload = function(contentid){
            $http.post("/upload", upload.single("file"), (req, res) => {
                res.redirect("/");
              });
              
            // app.get("/image/:filename", (req, res) => {
            //     // console.log('id', req.params.id)
            //     const file = gfs
            //       .find({
            //         filename: req.params.filename
            //       })
            //       .toArray((err, files) => {
            //         if (!files || files.length === 0) {
            //           return res.status(404).json({
            //             err: "no files exist"
            //           });
            //         }
            //         gfs.openDownloadStreamByName(req.params.filename).pipe(res);
            //       });
            //   });
              
        }

    }
})();