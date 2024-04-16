function show_with_title(model_name, model, opt) {
  show(model, opt);
  var title = document.getElementById("canvas_title");
  if (title) {
    title.innerHTML = model_name;
  }
}
function show(model, opt) {
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
  draw_shape(model, 'model_canvas', opt);
  var title = document.getElementById("canvas_title");
  if (title) {
    title.innerHTML = "";
  }
}
function ishow_with_title(model_name, model, axis, rmin, rmax, rstep) {
  ishow(model, axis, rmin, rmax, rstep)
  var title = document.getElementById("canvas_title");
  if (title) {
    title.innerHTML = model_name;
  }
}
function ishow(model, axis, rmin, rmax, rstep) {
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
  var shape = new OrbitShape(model.descr, model.isoms, 'model_canvas', {has_concave_faces: false});
  slider.oninput = function() {
    shape.rotate_descriptive(this.rot_axis, this.value);
    var angle_deg = this.value * 180 / Math.PI;
    if (angle_text) {
      angle.innerText = Math.round((angle_deg + Number.EPSILON) * 10) / 10;
    }
  }
  slider.oninput()
  var title = document.getElementById("canvas_title");
  if (title) {
    title.innerText = "";
  }
}
function morph_show(model, rmin, rmax, rstep) {
  // morph vertices interactively with slide-bar
  document.getElementById("model").style.display = "block";
  document.getElementById("model").style.initialised = false;
  var slider = document.getElementById("v_factor");
  /*
  var angle = document.getElementById("angle");
  var angle_text = document.getElementById("angle_text");
  */
  slider.hidden = false;
  slider.value = 0;
  /*
  if (angle_text) {
    angle_text.style.display = "block";
    angle.innerHTML = 0;
  }
  */
  // either define one or define all
  if (rmin === undefined || rmax === undefined) {
    slider.min = 0
    slider.max = 1
  } else {
    slider.min = rmin;
    slider.max = rmax;
  }
  if (rstep === undefined) {
    slider.step = 0.001;
  } else {
    slider.step = rstep;
  }
  var shape = new MorphShape(model.descr, 'model_canvas', {has_concave_faces: false});
  slider.oninput = function() {
    shape.morph_descriptive(this.value);
    /*
    if (angle_text) {
      angle.innerText = Math.round((angle_deg + Number.EPSILON) * 10) / 10;
    }
    */
  }
  slider.oninput()
  var title = document.getElementById("canvas_title");
  /*
  if (title) {
    title.innerText = "";
  }
  */
}
function hide() {
  if (document.getElementById("model").style.initialised) {
    document.getElementById("model").style.display = "none";
  } else {
    document.getElementById("model").style.initialised = true;
  }
}
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text OK');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard OK!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
function relToAbsPath(relative_path) {
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf('/'));
  return dir + "/" + relative_path;
}
