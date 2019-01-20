function show(model) {
  draw_shape(model, 'model_canvas', 10);
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
