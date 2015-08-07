/**
 * Test controller
 */
myAppController.controller('TestController', function($scope, $routeParams, $filter, $location, $log, $cookies, $timeout, $interval, dataFactory, dataService, _) {
    $scope.testHeader = function() {
        dataFactory.getRemoteData('http://zwave.eu/api/test/headers/index.php?code=401').then(function(response) {

            dataService.updateTimeTick();
        }, function(error) {

            dataService.showConnectionError(error);
        });
    };
    
    
    /**
     * Show door lock modal window
     */
    $scope.loadDoorLock = function(target, id, input) {
        $(target).modal();
        $scope.input = {
            title: 'Door Lock 1'
        };
        $scope.doorLock = {data: false, icon: 'fa-spinner fa-spin', message: $scope._t('loading')};
        //dataFactory.getApi('devices', '/' + id, true).then(function(response) {
         dataFactory.getApiLocal('door_lock.json').then(function(response) {
             console.log(response)
            if (response.data.data.metrics.events) {
                $scope.doorLock = {data: response.data.data};
            } else {
                $scope.doorLock = {data: false, icon: 'fa-info-circle text-warning', message: $scope._t('no_data')};
            }
        }, function(error) {
            $scope.doorLock = {data: false, icon: 'fa-exclamation-triangle text-danger', message: $scope._t('error_load_data')};
        });

    };

     $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    console.log(last)
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };
  
  /**
     * Load data into collection
     */
    $scope.devicesMaster = [];
    $scope.devices = [];
     $scope.cnt = 0;
    $scope.end = 16;
     $scope.scroll = {
         start: 0,
         end: 20,
         cnt: 0,
         itemCnt: 0
     };
    $scope.loadDevices = function() {
        dataFactory.getApi('devices').then(function(response) {
             $scope.scroll.cnt += 1;
             $scope.scroll.itemCnt = _.size(response.data.data.devices);
             var test = _.has(response.data.data.devices[0], 'id');
             console.log(test)
            $scope.devicesMaster = response.data.data.devices;
           if($scope.scroll.cnt > 2){
                //$scope.end += 1;
                  $scope.scroll.end =  ( $scope.scroll.end >=  $scope.scroll.itemCnt ?  $scope.scroll.itemCnt : $scope.scroll.end += 1);
            }
            $scope.devices = $scope.devicesMaster.slice($scope.scroll.start,$scope.scroll.end);
            console.log($scope.scroll.cnt)
            console.log($scope.scroll.end)
        }, function(error) {});
    };
    //$scope.loadDevices();
    
     $scope.loadMoreData = function() {
        //console.log($scope.devices)
    };
    $scope.loadMoreData();
  
});


