Influx.Spikes = function (lat, long) {

  // convert the positions from a lat, lon to a position on a sphere.
  var latLongToVector3 = function(lat, lon, RADIUS, heigth) {
    var phi   = (lat) * Math.PI/180,
        theta = (lon-180) * Math.PI/180;

    var x = -(RADIUS+heigth) * Math.cos(phi) * Math.cos(theta),
        y =  (RADIUS+heigth) * Math.sin(phi),
        z =  (RADIUS+heigth) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  var geom        = new THREE.Geometry();
  var boxGeometry = new THREE.BoxGeometry(1, 100, 1);

  //iterates through the data points and makes boxes with the coordinates
  var position = latLongToVector3(lat, long, 300, 2);

  box = new THREE.Mesh( boxGeometry );

  //each position axis needs to be set separately, otherwise the box
  //will instantiate at (0,0,0)
  box.position.x = position.x;
  box.position.y = position.y;
  box.position.z = position.z;

  // box.scale.set = new THREE.Vector3(0, 0, 0);
  box.updateMatrix();

  //merges the geometry to speed up rendering time, don't use THREE.GeometryUtils.merge because it's deprecated
  geom.merge(box.geometry, box.matrix);


  var total = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
    color: getRandomColor(),
    morphTargets: true
  }));

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  //add boxes to the group
  group.add(total);

};
