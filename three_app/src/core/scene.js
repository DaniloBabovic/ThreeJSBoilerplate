//import THREE from 'three'

class Scene {

    constructor ( app) {

        this.app = app
        this.scene = new THREE.Scene ( )

        this.scene.axisHelper = new THREE.AxisHelper( 30 )
		this.scene.add( this.scene.axisHelper )

	    // Camera
	    this.scene.camera = new THREE.PerspectiveCamera  (
            45,
            this.app.width / this.app.height,
            1, 5000
        )
        let pos = this.app.config.scene.camera_position
        this.scene.camera.position.set ( pos[ 0 ], pos[ 1 ], pos[ 2 ] )
        THREE.ImageUtils.crossOrigin = '';
    }
}

export default Scene
