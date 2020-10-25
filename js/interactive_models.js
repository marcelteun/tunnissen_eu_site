function show_with_title(model_name, model, cam_dist) {
  show(model, cam_dist);
  var title = document.getElementById("canvas_title");
  if (title) {
    title.innerHTML = model_name;
  }
}
function show(model, cam_dist) {
  // static show: off file and no slide-bar
  document.getElementById("model").style.display = "block";
  document.getElementById("model").style.initialised = false;
  var slider = document.getElementById("rot_angle")
  var angle_text = document.getElementById("angle_text");
  if (angle_text) {
    angle_text.style.display = "none";
  }
  if (slider != null) {
    slider.hidden = true;
  }
  if (!cam_dist) {cam_dist = 10;}
  draw_shape(model, 'model_canvas', cam_dist);
  var title = document.getElementById("canvas_title");
  if (title) {
    title.innerHTML = "";
  }
}
function ishow_with_title(model_name, model, cam_dist, axis, rmin, rmax, rstep) {
  ishow(model, cam_dist, axis, rmin, rmax, rstep)
  var title = document.getElementById("canvas_title");
  if (title) {
    title.innerHTML = model_name;
  }
}
function ishow(model, cam_dist, axis, rmin, rmax, rstep) {
  // interactive show: with slide-bar
  document.getElementById("model").style.display = "block";
  document.getElementById("model").style.initialised = false;
  var slider = document.getElementById("rot_angle");
  var angle = document.getElementById("angle");
  var angle_text = document.getElementById("angle_text");
  slider.hidden = false;
  slider.value = 0;
  if (angle_text) {
    angle_text.style.display = "block";
    angle.innerHTML = 0;
  }
  // either define one or define all
  if (axis === undefined || rmin === undefined || rmax === undefined) {
    slider.min = model.angle_domain[0];
    slider.max = model.angle_domain[1];
    slider.rot_axis = model.rot_axis;
  } else {
    slider.min = rmin;
    slider.max = rmax;
    slider.rot_axis = axis;
  }
  if (rstep === undefined) {
    slider.step = 0.001;
  } else {
    slider.step = rstep;
  }
  if (!cam_dist) {cam_dist = 10;}
  var shape = new OrbitShape(model.descr, model.isoms, 'model_canvas', cam_dist, {has_concave_faces: false});
  slider.oninput = function() {
    shape.rotate_descriptive(this.rot_axis, this.value);
    var angle_deg = this.value * 180 / Math.PI;
    if (angle_text) {
      angle.innerText = Math.round((angle_deg + Number.EPSILON) * 10) / 10;
    }
  }
  var title = document.getElementById("canvas_title");
  if (title) {
    title.innerText = "";
  }
}
function hide() {
  if (document.getElementById("model").style.initialised) {
    document.getElementById("model").style.display = "none";
  } else {
    document.getElementById("model").style.initialised = true;
  }
}
