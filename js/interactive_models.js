function show(model, cam_dist) {
  document.getElementById("model").style.display = "block";
  document.getElementById("model").style.initialised = false;
  document.getElementById("rot_angle").hidden = true;
  if (!cam_dist) {cam_dist = 10;}
  draw_shape(model, 'model_canvas', cam_dist);
}
function ishow(model, axis, rmin, rmax, rstep, cam_dist) {
  document.getElementById("model").style.display = "block";
  document.getElementById("model").style.initialised = false;
  var slider = document.getElementById("rot_angle");
  slider.hidden = false;
  slider.min = rmin;
  slider.max = rmax;
  slider.step = rstep;
  if (!cam_dist) {cam_dist = 10;}
  var shape = new OrbitShape(model.descr, model.isoms, 'model_canvas', cam_dist, {has_concave_faces: false});
  slider.oninput = function() {
    shape.rotate_descriptive(axis, this.value);
  }
  slider.value = 0;
}
function hide() {
  if (document.getElementById("model").style.initialised) {
    document.getElementById("model").style.display = "none";
  } else {
    document.getElementById("model").style.initialised = true;
  }
}
