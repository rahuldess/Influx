Influx.moveTracker = function() {

  window.controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.enableZoom = false;

  function render() {
    camera.lookAt( new THREE.Vector3(0, 0, 0));
    group.rotation.y -= 0.001;
    renderer.render( scene, camera );
  };

};
