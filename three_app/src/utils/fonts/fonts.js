import loadFontUtils from './FontUtils.js'

class Fonts {

    constructor ( config ) {

        this.config = config
        this.font_paths = config.scene.font_paths
        
        this.fonts = []
        this.prepare ()
        this.setPromise ( )

        loadFontUtils( THREE )
    }

    setPromise ( ) {

        const setPromiseFunctions = ( resolve, reject ) => {

            this.resolve = resolve
            this.reject = reject
        }
        this.promise = new Promise(

            ( resolve, reject ) => {

                setPromiseFunctions ( resolve, reject )
            }
        )
    }

    prepare () {

        for ( let fontName in this.font_paths ) {

            let fontPath = this.font_paths [ fontName ]
            let fontInfo = {

                name: fontName,
                path: fontPath,
                font: null,
                loaded: false
            }
            this.fonts.push ( fontInfo )
        }
    }

    start ( ) {

        this.loadFonts ( )
        return this.promise
    }

    loadFonts ( ) {

        for ( let i = 0; i < this.fonts.length; i++ ) {

            let fontInfo = this.fonts[i]
            this.loadFont ( fontInfo )
        }
    }

    loadFont ( fontInfo ) {

        var loader = new THREE.FontLoader( );

        loader.after = ( font ) => {

            this.afterFontLoad ( fontInfo, font )
        }

        loader.load( fontInfo.path, ( font ) => loader.after( font ) )
    }

    afterFontLoad ( fontInfo, font ) {

        fontInfo.font = font
        fontInfo.loaded = true
        this.checkDone ()
    }

    checkDone ( ) {

        for ( let i = 0; i < this.fonts.length; i++ ) {

            if (this.fonts [ i ].loaded == false ) return
        }
        this.config.fonts = this
        this.resolve ()
    }

    getFont ( fontName ) {

        for ( let i = 0; i < this.fonts.length; i++ ) {

            let fontInfo = this.fonts [ i ]
            if ( fontInfo.name == fontName ) return fontInfo.font
        }
        return null
    }
}

export default Fonts
