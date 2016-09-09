import Common from  "../utils/common.js"
class Progress {

    constructor ( app, text = 'Loading' ) {

        this.app = app
        this.text = text
        this.font = this.app.config.fonts.getFont ( "helvetiker_regular" )
    }

    insert ( startText = "Loading models" ) {

        let parameters = {

            text: startText, size: 8, height: 1.4, curveSegments: 6,
            font: this.font, weight: "normal",	style: "normal",
            bevelThickness: 2,	bevelSize: 1.5,	bevelSegments: 3, bevelEnabled: false
        }

        let paramMaterial = {

            transparent : false, opacity : 1,

            color : 0xAAAAAA,
            emissive : 0xFF4400,
            emissiveIntensity : 1, shininess : 30,

            vertexColors : 0, side : 0,  shading : 2, blending : 1,
            fog : true, wireframe : false,

            map: null, envMap : null, lightMap : null,
            specularMap : null, alphaMap : null,

            reflectivity : 1, refractionRatio : 0.98,

            polygonOffset : false,
            polygonOffsetFactor : 0, polygonOffsetUnits : 0
        }

        var textGeometry = new THREE.TextGeometry( startText, parameters )
	    textGeometry.center( );

        let meshMaterial = new THREE.MeshPhongMaterial( paramMaterial )
    	let mesh = new THREE.Mesh( textGeometry, meshMaterial )
    	this.mesh = mesh

    	mesh.position.set( 0, 0, 0 );
    	mesh.rotation.set( 0, 0, 0 );
        let scale = 2.5
    	mesh.scale.set( scale, scale, scale )

    	this.app.scene.add( mesh )

        this.mesh = mesh
        this.textGeometry = textGeometry
        this.meshMaterial = meshMaterial
        this.parameters = parameters
    }

    onProggresEvent ( event, text = "", objLength = 2662019 ) {

        if ( event != null ) {
            let loaded = event.loaded
            let total = event.total
            if ( Common.isNull( total) ) total = objLength
            if ( total == 0 ) total = objLength
            let percent = (loaded / total) * 100
            percent = Math.floor (percent)
            text = this.text + ' ' + percent
        }

        this.mesh.geometry.dispose();
		var geometry = new THREE.TextGeometry( text, this.parameters )
		geometry.center();

		this.mesh.geometry = geometry;
        this.geometry = geometry
        this.app.render ( )
    }

    onSetText ( text) {

        this.mesh.geometry.dispose();
		var geometry = new THREE.TextGeometry( text, this.parameters )
		geometry.center();

		this.mesh.geometry = geometry;
        this.geometry = geometry
        this.app.render ( )
    }

    remove ( ) {

        this.app.scene.remove( this.mesh )
        this.mesh.geometry.dispose();
        this.app.render ( )
    }
}

export default Progress
