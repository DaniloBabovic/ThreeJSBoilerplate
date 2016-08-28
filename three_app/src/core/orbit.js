//import THREE  from 'three'
import initOrbit from '../utils/orbit_controls.js'


class Orbit {

    constructor ( app ) {

        this.app = app
        this.camera = app.scene.camera
        this.renderer = app.renderer.rendererGL
        this.controlsTarget = new THREE.Object3D( )
        this.controlsTarget.position.y = 50
		app.scene.add( this.controlsTarget )

        initOrbit (THREE)
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.addEventListener (

            'change',
            ( ) => ( this.render( ) )
        )
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25
		this.controls.enableZoom = true
		this.controls.rotateSpeed = 0.4
        //this.controls.minPolarAngle = Math.PI / 8;
        //this.controls.maxPolarAngle = Math.PI / 8 * 7;
        this.controls.maxDistance = 1000;
        this.controls.minDistance = 50;
        this.controls.enableKeys = true;
        this.controls.enablePan = true;
        //this.controls.enabled = this.parent._freeMove;


		this.controls.target.set (

			this.controlsTarget.position.x,
			this.controlsTarget.position.y,
			this.controlsTarget.position.z

		)

		this.controls.update ( )
    }

    render ( ) {

        this.app.render ( )
    }
}

export default Orbit
