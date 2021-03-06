//import THREE from 'three'
import Common from '../utils/common.js'

class Floor {

    constructor ( app ) {

        this.app = app
        this.scene = app.scene
        this.data = app.config.scene.floor

        // Read floor JSON params: three_app/config/scene.json
        this.materialName = this.data.material.name
        this.name_custom = this.data.material.name_custom
        this.params = this.data.material.params

        this.file_path = this.data.file_path
        this.paramPlain = this.data.paramPlain
        this.position = this.data.position
        this.rotation = Common.piMultiply ( this.data.rotation )

        this.scale = this.data.scale

        this.insertPlain ( )
    }

    insertPlain ( ) {

        let meshMaterial

        let onDone = ( event ) =>  this.app.render ( )

        let loader = new THREE.TextureLoader ( )
        loader.crossOrigin = '';
        let texture = loader.load ( this.file_path, onDone )


        this.params.map = texture

        if ( this.materialName == "MeshPhongMaterial" ) {

    		meshMaterial = new THREE.MeshPhongMaterial( this.params )

    	} else if ( this.materialName == "MeshLambertMaterial" ) {

    		meshMaterial = new THREE.MeshLambertMaterial( this.params )

    	} else  {

            meshMaterial = new THREE.MeshStandardMaterial( this.params )

        }

        meshMaterial.envMap = this.app.sky.cubeMap

    	var geometry = new THREE.PlaneGeometry	( ...this.paramPlain )
    	/*
    		width — Width along the X axis.
    		height — Height along the Y axis.
    		widthSegments — Optional. Default is 1.
    		heightSegments — Optional. Default is 1.
    	*/

    	var plane = new THREE.Mesh( geometry, meshMaterial )
    	plane.position.set( ...this.position )
    	plane.rotation.set( ...this.rotation )
    	plane.scale.set( ...this.scale )

        this.scene.add ( plane )
        this.plane = plane
    }
}

export default Floor
