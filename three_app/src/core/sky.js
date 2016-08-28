//import THREE  from 'three'

class Sky {

    constructor ( app ) {

        this.app = app
        this.img_dir = app.config.data.img_dir
    	this.materials = [

            this.createMaterial( this.img_dir + 'skyX55+x.png' ), // right
    		this.createMaterial( this.img_dir + 'skyX55-x.png' ), // left
    		this.createMaterial( this.img_dir + 'skyX55+y.png' ), // top
    		this.createMaterial( this.img_dir + 'skyX55-y.png' ), // bottom
    		this.createMaterial( this.img_dir + 'skyX55+z.png' ), // back
    		this.createMaterial( this.img_dir + 'skyX55-z.png' )  // front

    	];

    	// Create a large cube
    	let mesh = new THREE.Mesh 	(

			new THREE.BoxGeometry( 1500, 1500, 1500, 1, 1, 1 ),
			new THREE.MeshFaceMaterial( this.materials )

		);

    	// Set the x scale to be -1, this will turn the cube inside out
    	mesh.scale.set ( -1, 1, 1 );
    	mesh.position.y = -50;
    	mesh.rotation.y = Math.PI/2;
    	app.scene.add( mesh );
        this.i = 0
    }

    createMaterial ( path ) {

        let onDone = ( event ) => {

            this.app.render ( )
        }
		let loader = new THREE.TextureLoader ( )
        loader.crossOrigin = '';
        let texture = loader.load ( path, onDone );
		let material = new THREE.MeshBasicMaterial ( { map: texture, overdraw: 0.5, fog: true } );

		return material;

	}

    onTexture ( texture ) {

        this.materials[ index ] = texture;
        this.i += 1;
        if ( this.i == 6 )
        {
            // Create a large cube
            var mesh = new THREE.Mesh 	(
                                            new THREE.BoxGeometry( 1000, 1000, 1000, 1, 1, 1 ),
                                            new THREE.MeshFaceMaterial( materials )
                                        );

            // Set the x scale to be -1, this will turn the cube inside out
            mesh.scale.set ( -1, 1, 1 );
            //mesh.position.y = 400;
            mesh.rotation.y = Math.PI/2;
            this.app.scene.add( mesh );
            this.app.render()
        }
    }

    loadMaterial ( index, path ) {

		let loader = new THREE.TextureLoader( )
        loader.crossOrigin = '';
        let notify = ( texture ) => { this.onTexture ( texture ) }
		loader.load( path, notify )
	}
}

export default Sky
