function tetartoid_vertices(a, b, c) {
  var n = a**2 * c - b * c**2;
  var d1 = a * (a - b + c) + b * (b - 2 * c);
  var d2 = a * (a + b - c) + b * (b - 2 * c);
  var e1 = n / d1;
  var e2 = n / d2;
  return [
    [a, b, c],
    [-a, -b, c],
    [-e1, -e1, e1],
    [-c, -a, b],
    [-e2, e2, e2],
  ];
}
var pyrito = new Object();
pyrito.descr = new Object();
var tau = (Math.sqrt(5) + 1) / 2
pyrito.a = 0;
pyrito.b = tau + 1
pyrito.c = tau
pyrito.descr.Vs = tetartoid_vertices(pyrito.a, pyrito.b, pyrito.c);
pyrito.descr.Fs = [[0, 1, 2, 3, 4]];
pyrito.descr.transform = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
pyrito.isoms = [
[
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
],[
  [0, 0, 1, 0],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 0, 1]
],[
  [0, 0, 1, 0],
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 1]
],[
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
],[
  [1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, -1, 0],
  [0, 0, 0, 1]
],[
  [0, 0, -1, 0],
  [1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 0, 1]
],[
  [0, 1, 0, 0],
  [0, 0, -1, 0],
  [-1, 0, 0, 0],
  [0, 0, 0, 1]
],[
  [-1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, -1, 0],
  [0, 0, 0, 1]
],[
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 1]
],[
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [-1, 0, 0, 0],
  [0, 0, 0, 1]
],[
  [0, -1, 0, 0],
  [0, 0, -1, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 1]
],[
  [0, 0, -1, 0],
  [-1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 1]
],];
pyrito.isoms[0].col = [64, 104, 224];
pyrito.isoms[1].col = [64, 104, 224];
pyrito.isoms[2].col = [153, 204, 49];
pyrito.isoms[3].col = [153, 204, 49];
pyrito.isoms[4].col = [220, 159, 220];
pyrito.isoms[5].col = [220, 159, 220];
pyrito.isoms[6].col = [254, 214, 0];
pyrito.isoms[7].col = [254, 214, 0];
pyrito.isoms[8].col = [153, 204, 49];
pyrito.isoms[9].col = [64, 104, 224];
pyrito.isoms[10].col = [220, 159, 220];
pyrito.isoms[11].col = [254, 214, 0];

ModelPlay.prototype.tetar_show = function(model, rmin, rmax, title="", rstep=undefined) {
  // interactive show: with slide-bar
  this.nodes.area.style.display = "block";
  this.nodes.area.style.initialised = false;

  this.nodes.slider.hidden = false;
  this.nodes.slider.value = Math.sqrt(Math.sqrt(tau));
  this.nodes.angle_text.style.display = "block";
  // either define one or define all
  if (rmin === undefined || rmax === undefined) {
    this.nodes.slider.min = model.angle_domain[0];
    this.nodes.slider.max = model.angle_domain[1];
  } else {
    this.nodes.slider.min = rmin;
    this.nodes.slider.max = rmax;
  }
  this.nodes.slider.player = this;
  if (rstep === undefined) {
    this.nodes.slider.step = 0.001;
  } else {
    this.nodes.slider.step = rstep;
  }
  var shape = new OrbitShape(model.descr, model.isoms, this.nodes.canvas, {has_concave_faces: true});
  this.nodes.slider.oninput = function() {
    shape.base.Vs = tetartoid_vertices(model.a, model.b, parseFloat(this.value) ** 4);
    shape.rescale();
    shape.triangulate();
    shape.paint();
  }
  this.nodes.slider.oninput()
  this.nodes.title.innerHTML = title;
}
