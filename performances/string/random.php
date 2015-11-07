<!DOCTYPE html>
<html ng-app="axedia">
<head>
<title>AxediaJS</title>
<link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
<style>
  table tbody tr:last-of-type{
  background-color: #f2dede;
  }
  table tbody tr:first-of-type{
  background-color: #dff0d8;
  }
</style>
</head>
<body ng-controller="axediaCtrl">
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-12">
      <table class="table table-stripped table-bordered">
        <thead>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Ciclos</th>
          <th>Ops/Sec</th>
          <th>Promedio</th>
          <th>Margen de Error</th>
          <th>Eficiencia</th>
        </thead>
        <tbody>
          <tr ng-repeat="b in benchmarks | orderBy : 'eficiencia'">
            <td>{{b.name}}</td>
            <td>{{b.count}}</td>
            <td>{{b.cycles}}</td>
            <td>{{b.opsec}}</td>
            <td>{{b.stats.mean}}</td>
            <td>{{b.stats.moe}}</td>
            <td>{{b.porc}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<script src="/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/bower_components/angular/angular.min.js"></script>
<script src="/bower_components/benchmark/benchmark.js"></script>
<script src="/dist/axedia.js"></script>
<script>
/* Funciones */
Benchmark.prototype.setup = function() {
  var $Number = axedia.Number;
  var _fromCharCode = String.fromCharCode

  function opcion1(length) {
    length = $Number.constrain(length || $Number.randomInt(1,32), 1, 1000);
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var str = '';

    for (var i = 0; i < length; i++) {
        str += chars.charAt($Number.randomInt(0, chars.length - 1));
    }
    return str;
  }

  function opcion2(length) {
    length = $Number.constrain(length || $Number.randomInt(1,32), 1, 1000);
    var str = '';

    for (var i = 0; i < length; i++) {
        switch ($Number.randomInt(1, 3)) {
          case 1:
            str += String.fromCharCode($Number.randomInt(65, 90));
            break;
          case 2:
            str += String.fromCharCode($Number.randomInt(97, 122));
            break;
          case 3:
            str += $Number.randomInt(0, 9);
            break;
        }
    }
    return str;
  }

  function opcion3(length) {
    length = $Number.constrain(length || $Number.randomInt(1,32), 1, 1000);
    var str = '';

    for (var i = 0; i < length; i++) {
        switch ($Number.randomInt(1, 3)) {
          case 1:
            str += _fromCharCode($Number.randomInt(65, 90));
            break;
          case 2:
            str += _fromCharCode($Number.randomInt(97, 122));
            break;
          case 3:
            str += $Number.randomInt(0, 9);
            break;
        }
    }
    return str;
  }
}

/* Tests */
var suite = new Benchmark.Suite;
suite.add('charAt', function() {
  opcion1(100);
  opcion1(1000);
  opcion1(10000);
  opcion1(undefined);
})
.add('String.fromCharCode', function() {
  opcion2(100);
  opcion2(1000);
  opcion2(10000);
  opcion2(undefined);
})
.add('cached fromCharCode', function() {
  opcion3(100);
  opcion3(1000);
  opcion3(10000);
  opcion3(undefined);
});

angular.module('axedia', [])
.controller('axediaCtrl', function($scope) {
  $scope.benchmarks = [];

  suite.on('cycle', function(event) {
    var b = event.target;
    b.opsec = Math.floor(b.hz);
    b.eficiencia = b.stats.mean + b.stats.moe;
    $scope.benchmarks.push(b);
    $scope.$apply();
  })
  .on('complete', onComplete)
  .run({ 'async': true });

  function onComplete() {
    var fastest = this.filter('fastest')[0];
    this.forEach(onEach);
    $scope.$apply();
    function onEach(item) {
      if (fastest.name == item.name) {
        item.porc = 'referencia';
        return
      }
      item.porc =  (100 - Math.floor(item.hz * 100 / fastest.hz)) + '% mas lento';
    }
  }
});
</script>
</body>
</html>
