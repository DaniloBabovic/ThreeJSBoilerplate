import Common from '../utils/common.js'

class Textures {

    constructor ( app, onDone ) {

        this.app = app
        this.onDone = onDone

        this.textures_json = app.config.scene.textures
        this.env_textures_json = app.config.scene.env_textures

        this.textureCount = 0
        this.textureLoadCount = 0
        this.textures_done = false

        this.env_texture_count = 0
        this.env_texture_load_count = 0
        this.env_textures_done = false

        this.loadTextures ( )
        this.loadEnvTextures ( )
    }

    loadTextures ( ) {

        const onTextureLoaded = ( ) => {

            if ( this.textureCount >= this.textureLoadCount ) {

                this.textures_done = true
                this.done ( )
            }
        }
        const load = ( data ) => {

            let loader = new THREE.ImageLoader();
            data.texture = loader
            loader.load (
                data.file_path,
                (image) => {

                    this.textureLoadCoount += 1
                    onTextureLoaded ( )
                }
            )
        }
        let keys = Common.getObjectsKeys ( this.textures_json )
        this.textureCount = keys.length

        for ( let key in this.textures_json ) {

            let data = this.textures_json[key]
            load ( data )
        }
    }

    loadEnvTextures ( ) {

        const onTextureLoaded = ( data ) => {


            if ( this.env_texture_count === this.env_texture_load_count ) {

                this.env_textures_done = true
                this.done ( )
            }
        }

        const load = ( data ) => {

            let loader = new THREE.ImageLoader();
            loader.load (
                data.file_path,
                (image) => {
                    data.image = image
                    this.env_texture_load_count += 1
                    onTextureLoaded ( data )
                }
            )
        }

        let keys = Common.getObjectsKeys ( this.env_textures_json )
        this.env_texture_count = keys.length

        for ( let key in this.env_textures_json ) {

            let data = this.env_textures_json [ key ]
            load ( data )
        }
    }

    done ( ) {

        if (    (this.textures_done     == true) &&
                (this.env_textures_done == true)
        ) {

            this.app.textures = this
            this.onDone ()
            this.app.textures = this
        }
    }

    getTexture ( name ) {

        for ( let key in this.textures_json ) {

            let data = this.textures_json[key]
            if ( data.name == name ) return data
        }
        return null
    }

    getEnvTexture ( name ) {

        for ( let key in this.env_textures_json ) {

            let data = this.env_textures_json[key]
            if ( data.name == name ) return data
        }
        return null
    }
}

export default Textures
