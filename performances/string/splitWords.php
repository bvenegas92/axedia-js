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
  var $RegExp = {
      BASIC_TRIM: /^\s+|\s+$/g,
      WHITE_SPACE: /\s+/
  };

  var BASIC_TRIM = /^\s+|\s+$/g;
  var WHITE_SPACE = /\s+/;

  function opcion1(words) {
    if (words && typeof words === 'string') {
        return words
            .replace(BASIC_TRIM, '')
            .split(WHITE_SPACE);
    }
    return words || [];
  }

  function opcion2(words) {
    if (words && typeof words === 'string') {
        return words
            .replace($RegExp.BASIC_TRIM, '')
            .split($RegExp.WHITE_SPACE);
    }
    return words || [];
  }

  function opcion3(words) {
    if (words && typeof words === 'string') {
        return words
            .replace(/^\s+|\s+$/g, '')
            .split(/\s+/);
    }
    return words || [];
  }
}

/* Tests */
var suite = new Benchmark.Suite;
suite.add('regexp local', function() {
  opcion1('vi veri veniversum vivus vici');
  opcion1('   vi veri veniversum vivus vici   ');
  opcion1(undefined);
})
.add('regexp en namespace', function() {
  opcion2('vi veri veniversum vivus vici');
  opcion2('   vi veri veniversum vivus vici   ');
  opcion2(undefined);
})
.add('regexp directo', function() {
  opcion3('vi veri veniversum vivus vici');
  opcion3('   vi veri veniversum vivus vici   ');
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
