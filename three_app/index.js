import checkPrerequest from './src/utils/web_gl_ok.js'
import Prepare from './src/prepare.js'
import Config from './src/config.js'
import App from './src/app.js'

class ThreeComponent {

    constructor() {

        this.siteURL = location.protocol + '//' + location.host + '/';
        this.configPath = 'three_app/config/config.json'
        this.sceneJsonPath = 'three_app/config/scene.json'

        this.app = null
        this.config = null

        const loadContainer = ( ) => this.loadContainer ()
        this.config = new Config (

            this.siteURL,
            this.configPath,
            this.sceneJsonPath,
            loadContainer
        )
    }

    loadContainer ( ) {

        const loadApp = ( ) =>  this.loadApp ( )
        this.prepare = new Prepare ( loadApp, this.config )
    }

    loadApp ( ) {

        if ( checkPrerequest() )  {

            this.app = new App ( this.config, this.prepare )
        }
    }
}

let threeComponent = new ThreeComponent ( )
