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
var tau = (Math.sqrt(5) + 1) / 2
var tetar = new Object();
tetar.descr = new Object();
tetar.descr.Fs = [[0, 1, 2, 3, 4]];
tetar.descr.transform = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
tetar.isoms = [
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
  ],
];
tetar.isoms[0].col = [64, 104, 224];
tetar.isoms[1].col = [64, 104, 224];
tetar.isoms[2].col = [153, 204, 49];
tetar.isoms[3].col = [153, 204, 49];
tetar.isoms[4].col = [220, 159, 220];
tetar.isoms[5].col = [220, 159, 220];
tetar.isoms[6].col = [254, 214, 0];
tetar.isoms[7].col = [254, 214, 0];
tetar.isoms[8].col = [153, 204, 49];
tetar.isoms[9].col = [64, 104, 224];
tetar.isoms[10].col = [220, 159, 220];
tetar.isoms[11].col = [254, 214, 0];

ModelPlay.prototype.std_tetar_show = function(a, b, c, to_abc, to_slider, rmin, rmax, title, rstep) {
  // interactive show: with slide-bar
  tetar.a = a;
  tetar.b = b;
  tetar.c = c;
  tetar.descr.Vs = tetartoid_vertices(tetar.a, tetar.b, tetar.c);
  this.nodes.area.style.display = "block";
  this.nodes.area.style.initialised = false;

  this.nodes.slider.hidden = false;
  this.nodes.angle_text.style.display = "block";
  this.nodes.slider.min = rmin;
  this.nodes.slider.max = rmax;
  this.nodes.slider.player = this;
  if (rstep === undefined) {
    this.nodes.slider.step = 0.001;
  } else {
    this.nodes.slider.step = rstep;
  }
  this.nodes.slider.value = to_slider(a, b, c);
  var shape = new OrbitShape(tetar.descr, tetar.isoms, this.nodes.canvas, {has_concave_faces: true});
  this.nodes.slider.oninput = function() {
    var slider_val = parseFloat(this.value);
    // console.log("Got input value", slider_val);
    var abc = to_abc(slider_val);
    shape.base.Vs = tetartoid_vertices(abc[0], abc[1], abc[2]);
    shape.rescale();
    shape.triangulate();
    shape.paint();
  }
  this.nodes.slider.oninput();
  this.nodes.title.innerHTML = title;
}

ModelPlay.prototype.tetar_slide_c = function(a, b, c, rmin, rmax, title="", rstep=undefined) {
  this.std_tetar_show(
    a, b, c,
    function(value) {return [a, b, value];},
    function(a, b, c) {return c;},
    rmin, rmax,
    title,
    rstep
  );
}

ModelPlay.prototype.tetar_slide_c_scaled = function(a, b, c, rmin, rmax, title="", rstep=undefined) {
  this.std_tetar_show(
    a, b, c,
    function(value) {return [a, b, value ** 4];},
    function(a, b, c) {return Math.sqrt(Math.sqrt(c));},
    rmin, rmax,
    title,
    rstep
  );
}

ModelPlay.prototype.tetar_drill = function(b, rmin, rmax, title="", rstep=undefined) {
  b_to_c = function(value) {return (1 + value ** 2) / (2 * value);}
  this.std_tetar_show(
    1, b, b_to_c(b),
    function(value) {return [1, value, b_to_c(value)];},
    function(a, b, c) {return b;},
    rmin, rmax,
    title,
    rstep
  );
}
