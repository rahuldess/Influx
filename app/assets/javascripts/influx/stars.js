Influx.Stars = function(params = {}) {

  if ( !$.isEmptyObject(params) ) {

    var particleGeometry = new THREE.Geometry(),
        particleMaterial = new THREE.PointsMaterial({
          color: params.particle.color,
          size:  params.particle.size
        });

    // Creates particles and pushes to geometry
    for( i = 0; i <= params.particleCount; i++ ) {
      var pX = Math.random() * 3000 - 1000,
          pY = Math.random() * 3000 - 1000,
          pZ = Math.random() * 3000 - 1000;

      var particle = new THREE.Vector3(pX, pY, pZ);
      particleGeometry.vertices.push(particle);
    };

    // Meshes particles with material and pushes to  the particle system
    var particleSystem = new THREE.Points( particleGeometry, particleMaterial );
    group.add( particleSystem );
  } else {
    console.log("Trouble with Initializing Stars");
    return;
  }

};
