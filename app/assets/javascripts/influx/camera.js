Influx.Camera = function(params = {}) {

  if ( !$.isEmptyObject(params) ) {
    window.camera = new THREE.PerspectiveCamera(params.fov, params.aspectRatio, params.near, params.far);
    camera.position.set(params.position.x, params.position.y, params.position.z);
    camera.lookAt(new THREE.Vector3(0,0,0));
  } else {
    console.log("Trouble with Initializing Camera");
    return;
  }

};
