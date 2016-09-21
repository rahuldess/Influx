//= require influx/camera
//= require influx/scene
//= require influx/renderer
//= require influx/globe
//= require influx/stars
//= require influx/move_tracker
//= require influx/event_listener

$(document).ready(function () {

  //Initializing Scene
  Influx.Scene = new Influx.Scene();

  // Initializing Camera
  Influx.Camera = new Influx.Camera({
    fov: 60,
    aspectRatio: window.innerWidth / window.innerHeight,
    near: 1,
    far: 1000,
    position: {
      x: 0,
      y: 0,
      z: 750
    }
  });

  // Initializing renderer
  Influx.Renderer = new Influx.Renderer({
    clearColor: 0x000000,
    size: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  });

  Influx.Globe  = new Influx.Globe({
    radius: 300,
    width:  50,
    height: 50
  });

  //
  Influx.Stars  = new Influx.Stars({
    particleCount: 15000,
    particle: {
      color: 0xFFFFFF,
      size: 1
    }
  });

  Influx.moveTracker = new Influx.moveTracker();
  Influx.EventListener  = new Influx.EventListener();

  // Resizing the canvas whenever browser is resized
  if (window.addEventListener) {
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    };
  }

  (function animate() {
    requestAnimationFrame( animate );
    render();
    controls.update();
  })();

  function render() {
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    group.rotation.y -= 0.001;
    renderer.render( scene, camera );
  };

});
