function show(model, cam_dist) {
  if (!cam_dist) {cam_dist = 10;}
  draw_shape(model, 'model_canvas', cam_dist);
  document.getElementById("model").style.display = "block";
  document.getElementById("model").style.initialised = false;
}
function hide() {
  if (document.getElementById("model").style.initialised) {
    document.getElementById("model").style.display = "none";
  } else {
    document.getElementById("model").style.initialised = true;
  }
}
