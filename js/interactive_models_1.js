const MODEL_TITLE="model_titla";
const MODEL_CANVAS="model_canvas";
const ANGLE_SLIDER="angle_slider";
const ANGLE_TEXT="angle_text";

function ModelPlay(canvas_document, model_area_id) {
  /*
   * Create an interactive model player object
   *
   * canvas_document: optional parameter specifying the document containing the
   * an empty (div) node with the ID 'model_area_id'. If undefined then document
   * is used. If an HTML file is included as an object the you can use
   * this.parent.document for this
   *
   * model_area_id
   */
  if (canvas_document === undefined) {
    this.canvas_doc = document;
  } else {
    this.canvas_doc = canvas_document;
  }
  var model_area = this.canvas_doc.getElementById(model_area_id);
  if (model_area === null) {
    console.error(
      "Couldn't find the model_area node '" + model_area_id + "' in the document, bailing out."
    );
    return;
  }
  this.model_area = model_area;
  this.add_model_nodes();
}

ModelPlay.prototype.add_model_nodes = function() {
  /* Find the (div) node by ID and create required sub-nodes.
   *
   * The empty model area node should exist already.
   * The following nodes will be added to the model area.
   * - a header with the ID specified by const MODEL_TITLE
   * - a canvas with the ID specified by const MODEL_CANVAS
   * - a slider with the ID specified by const ANGLE_SLIDER
   * This method will make sure that these will only be created once.
   */

  if (this.canvas_doc.model_area_nodes === undefined) {
    this.nodes = {
      area: this.model_area,
    };
    this.nodes.title = this.canvas_doc.createElement('h3');
    // it must have some content
    this.nodes.title.content = " ";
    this.nodes.title.setAttribute("id", MODEL_TITLE);
    this.model_area.appendChild(this.nodes.title);

    this.nodes.canvas = this.canvas_doc.createElement('canvas');
    this.nodes.canvas.content = " ";
    this.nodes.canvas.setAttribute("id", MODEL_CANVAS);
    this.model_area.appendChild(this.nodes.canvas);

    this.nodes.slider = this.canvas_doc.createElement('input');
    this.nodes.slider.setAttribute("id", ANGLE_SLIDER);
    this.nodes.slider.setAttribute("type", "range");
    this.nodes.slider.setAttribute("class", "slider");
    this.model_area.appendChild(this.nodes.slider);

    this.nodes.angle_text = this.canvas_doc.createElement('p');
    this.nodes.angle_text.setAttribute("id", ANGLE_TEXT);
    this.nodes.angle_text.innerHTML = "";
    this.model_area.appendChild(this.nodes.angle_text);

    this.canvas_doc.model_area_nodes = this.nodes;

    console.log("This log should appear only once: model_area initialised");
  } else {
    this.nodes = this.canvas_doc.model_area_nodes;
  }
}

ModelPlay.prototype.show = function(model, title="", opt={}) {
  /*
   * Note that the following call doesn't really work:
   * show(model, opt={'bg'..})
   */
  // When you click the show button, it will call hide as well:
  this.ignore_next_hide = true;
  this.nodes.area.style.display = "block";
  this.nodes.slider.hidden = true;
  this.nodes.angle_text.style.display = "none";
  draw_shape(model, this.nodes.canvas, opt, this.canvas_doc);
  this.nodes.title.innerHTML = title;
}

ModelPlay.prototype.hide = function() {
  console.log("hide called");
  if (this.ignore_next_hide) {
    this.ignore_next_hide = false;
    console.log("... but ignored");
    return;
  }
  this.ignore_click = true;
  if (this.nodes.area.style.initialised) {
    console.log("hiding");
    this.nodes.area.style.display = "none";
  } else {
    console.log("init insteead of hiding");
    this.nodes.area.style.initialised = true;
  }
}

ModelPlay.prototype.ishow = function(model, axis, rmin, rmax, title="", rstep=undefined) {
  // interactive show: with slide-bar
  this.nodes.area.style.display = "block";
  this.nodes.area.style.initialised = false;

  this.nodes.slider.hidden = false;
  this.nodes.slider.value = 0;
  this.nodes.angle_text.style.display = "block";
  // either define one or define all
  if (axis === undefined || rmin === undefined || rmax === undefined) {
    this.nodes.slider.min = model.angle_domain[0];
    this.nodes.slider.max = model.angle_domain[1];
    this.nodes.slider.rot_axis = model.rot_axis;
  } else {
    this.nodes.slider.min = rmin;
    this.nodes.slider.max = rmax;
    this.nodes.slider.rot_axis = axis;
  }
  this.nodes.slider.player = this;
  if (rstep === undefined) {
    this.nodes.slider.step = 0.001;
  } else {
    this.nodes.slider.step = rstep;
  }
  var shape = new OrbitShape(model.descr, model.isoms, this.nodes.canvas, {has_concave_faces: false});
  this.nodes.slider.oninput = function() {
    shape.rotate_descriptive(this.rot_axis, this.value);
    var angle_deg = this.value * 180 / Math.PI;
    this.player.nodes.angle_text.innerHTML = "With &mu; = " +  angle_deg.toFixed(2) + " &deg;";
  }
  this.nodes.slider.oninput()
  this.nodes.title.innerHTML = title;
}

/* created to experiment with morphs, unpublished */
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
  var title = document.getElementById("model_title");
  /*
  if (title) {
    title.innerText = "";
  }
  */
}
// Created for heptagons page (unpublished)
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
