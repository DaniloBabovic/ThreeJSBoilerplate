//import THREE from 'three'

class Renderer {

    constructor ( app ) {

        this.app = app
        this.antialias = app.config.scene.antialias

        this.width = app.config.data.containerWidth
        this.height = app.config.data.containerHeight

        this.rendererGL = new THREE.WebGLRenderer ( {
            antialias: this.antialias
        } )

        this.rendererGL.setSize ( this.width, this.height )

        //this.parentDiv = this.app.prepared.app3d_container
        this.parentDiv = this.app.prepared.app3d_render_container
        this.parentDiv.appendChild( this.rendererGL.domElement )
    }

    render ( ) {

        this.rendererGL.render( this.app.scene, this.app.scene.camera )
    }
}

export default Renderer
