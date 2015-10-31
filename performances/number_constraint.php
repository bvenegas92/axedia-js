<!DOCTYPE html>
<html ng-app="axedia">
<head>
<title>AxediaJS</title>
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
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
          <td>Eficiencia</td>
        </thead>
        <tbody>
          <tr ng-repeat="b in benchmarks | orderBy : '-opsec'">
            <td>{{b.name}}</td>
            <td>{{b.count}}</td>
            <td>{{b.cycles}}</td>
            <td>{{b.opsec}}</td>
            <td>{{b.porc}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/benchmark/benchmark.js"></script>
<script src="dist/axedia.js"></script>
<script>
/* Funciones */
Benchmark.prototype.setup = function() {
  function constrain1(num, min, max) {
    return (num < min) ? min : ((num > max) ? max : num);
  }

  var _min = Math.min,
  _max = Math.max;

  function constrain2(num, min, max) {
    if (!isNaN(min)) {
      num = _min(min, num);
    }
    if (!isNaN(max)) {
      num = _max(max, num);
    }
    return num;
  }

  function constrain3(num, min, max) {
    if (!isNaN(min)) {
      num = Math.min(min, num);
    }
    if (!isNaN(max)) {
      num = Math.max(max, num);
    }
    return num;
  }

  function constrain4(num, min, max) {
    if (!isNaN(num)) {
      if (!isNaN(min)) {
        num = Math.min(min, num);
      }
      if (!isNaN(max)) {
        num = Math.max(max, num);
      }
    }
    return num;
  }
}

/* Tests */
var suite = new Benchmark.Suite;
suite.add('operators', function() {
  constrain1(10, 0, 20);
  constrain1(10, undefined, 5);
  constrain1(10, 0, undefined);
  constrain1(10, undefined, undefined);
})
.add('cached-funcs', function() {
  constrain2(10, 0, 20);
  constrain2(10, undefined, 5);
  constrain2(10, 0, undefined);
  constrain2(10, undefined, undefined);
})
.add('direct-math', function() {
  constrain3(10, 0, 20);
  constrain3(10, undefined, 5);
  constrain3(10, 0, undefined);
  constrain3(10, undefined, undefined);
})
.add('guarded-math', function() {
  constrain4(10, 0, 20);
  constrain4(10, undefined, 5);
  constrain4(10, 0, undefined);
  constrain4(10, undefined, undefined);
});

angular.module('axedia', [])
.controller('axediaCtrl', function($scope) {
  $scope.benchmarks = [];

  suite.on('cycle', function(event) {
    var b = event.target;
    b.opsec = Math.floor(b.hz);
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
