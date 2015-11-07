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
          <td>Nombre</td>
          <td>Cantidad</td>
          <td>Ciclos</td>
          <td>Ops/Sec</td>
          <th>Promedio</th>
          <th>Margen de Error</th>
          <th>Eficiencia</th>
        </thead>
        <tbody>
          <tr ng-repeat="b in benchmarks | orderBy : '-opsec'">
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
  var _floor = Math.floor, _random = Math.random;

  function varLocales(from, to) {
    return _floor(_random() * (to - from + 1) + from);
  }

  function mathFuncs(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
}

/* Tests */
var suite = new Benchmark.Suite;
suite.add('varLocales', function() {
  varLocales(10, 20);
  varLocales(10, undefined);
  varLocales(undefined, 20);
})
.add('mathFuncs', function() {
  mathFuncs(10, 20);
  mathFuncs(10, undefined);
  mathFuncs(undefined, 20);
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
