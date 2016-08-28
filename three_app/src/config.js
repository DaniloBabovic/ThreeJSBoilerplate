import Download from './utils/loaders/download.js'

class Config {

    constructor ( siteURL, configPath, sceneJsonPath, onLoad ) {

        this.rootURL = siteURL
        this.configPath = configPath
        this.sceneJsonPath = sceneJsonPath
        this.onLoad = onLoad

        this.configLoaded = false
        this.sceneJsonLoaded = false

        this.data = null
        this.loadConfig ( )
        this.loadSceneJson ( )
    }

    loadConfig ( ) {

        this.realtivePath = this.configPath + '?' + Date.now()
        this.URL = this.rootURL + this.realtivePath
        let onDone = ( err, response, body ) => {

            this.onConfigLoad ( err, response, body )
        }
        new Download ( this.URL, onDone )
    }

    onConfigLoad ( err, response, body ) {

        if ( err != null ) {

            console.log ( err )

        } else {

            let configJSON = JSON.parse ( body )
            //console.log( configJSON )
            this.data = configJSON
            this.configLoaded = true
            this.onDone ()
        }
    }

    loadSceneJson ( ) {

        this.realtivePath = this.sceneJsonPath + '?' + Date.now()
        this.URL = this.rootURL + this.realtivePath
        let onDone = ( err, response, body ) => {

            this.onSceneJsonLoad ( err, response, body )
        }
        new Download ( this.URL, onDone )
    }

    onSceneJsonLoad ( err, response, body ) {

        if ( err != null ) {

            console.log ( err )

        } else {

            let sceneJSON = JSON.parse ( body )
            //console.log( configJSON )
            this.scene = sceneJSON
            this.sceneJsonLoaded = true
            this.onDone ()
        }
    }

    onDone ( ) {

        if (this.sceneJsonLoaded == false) return
        if (this.configLoaded == false) return
        this.onLoad ( this )
    }
}

export default Config
