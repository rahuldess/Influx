Influx.Renderer = function(params = {}) {

  if ( !$.isEmptyObject(params) ) {
    window.renderer = new THREE.WebGLRenderer();

    renderer.setClearColor( params.clearColor );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( params.size.width, params.size.height );

    document.body.appendChild( renderer.domElement );
  } else {
    console.log("Trouble with Initializing Renderer");
    return;
  }

};
