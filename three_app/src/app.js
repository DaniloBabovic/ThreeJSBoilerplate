//import THREE from 'three'
import Renderer from './core/renderer.js'
import Scene from './core/scene.js'
import Lights from './core/lights.js'
import Floor from './core/floor.js'
import Models from './core/models.js'
import Sky from './core/sky.js'
import Orbit from './core/orbit.js'
import Progress from './core/progress.js'
import TweenLite from './utils/TweenLite.js'

class App {

    constructor ( config, prepared ) {

        this.prepared = prepared
        this.config = config

        this.parentDiv = this.prepared.app3d_render_container

        this.width = this.config.data.containerWidth
        this.height = this.config.data.containerHeight
        this.init()
    }

    init() {

        this.renderer = new Renderer ( this )
        this.scene = new Scene ( this ).scene

        this.progress = new Progress ( this )
        this.progress.insert()

        this.orbit = new Orbit ( this )
        this.lights = new Lights ( this )
        this.sky = new Sky ( this )
        this.floor = new Floor ( this )

        this.models = new Models ( this )

        window.addEventListener( 'resize', ( ) => ( this.onWindowResize ( ) ), false )

        this.render( )
    }

    onWindowResize ( ) {

        this.width = this.parentDiv.clientWidth
        this.height = this.parentDiv.clientHeight

        this.scene.camera.aspect = this.width / this.height
		this.scene.camera.updateProjectionMatrix( )

		this.renderer.rendererGL.setSize ( this.width, this.height )
        this.renderer.render()
    }

    render( ) {

        this.renderer.render()
    }
}

export default App
