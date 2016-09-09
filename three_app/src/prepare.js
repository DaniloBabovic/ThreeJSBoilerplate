import LoadCSS from './utils/loaders/load_css.js'
import LoadHTML from './utils/loaders/load_html.js'
import LoadJavaScripts from './utils/loaders/load_scripts.js'
import LoadJavaScriptZips from './utils/loaders/load_javascript_zips.js'
import Fonts from './utils/fonts/fonts.js'

class Prepare {

    constructor ( onLoad, config ) {

        this.onLoad = onLoad
        this.config = config

        this.createMainContainer ( )
        this.loadHTML ()
        //this.onLoad ()
    }

    createMainContainer ( ) {

        this.container = document.getElementById("div_app_3d")

        if ( this.container == null ) {

            let div = document.createElement("div")
            div.setAttribute("id", "div_app_3d")
            div.style["position"]       = 'absolute'
            div.style["left"]           = this.config.data.containerLeft + 'px'
            div.style["top"]            = this.config.data.containerTop + 'px'
            div.style["backgound-color"] = this.config.data.containerBackgoundColor
            div.style["width"]          = this.config.data.containerWidth + 'px'
            div.style["height"]         = this.config.data.containerHeight + 'px'
            document.body.appendChild(div);
            //console.log("yo");
            this.container = div

        } else {

            let offsets = this.container.getBoundingClientRect();
            let top = offsets.top;
            let left = offsets.left;

            //this.config.data.containerLeft = left
            //this.config.data.containerTop = top
            this.config.data.containerWidth = this.container.offsetWidth
            this.config.data.containerHeight = this.container.offsetHeight
        }
    }

    loadHTML ( ) {


        let css_path = 'three_app/container/styles.css'
        let html_path = 'three_app/container/container.html'

        this.rootURL = this.config.rootURL

        this.loaded = false
        this.alredadyDisplayed = false

        let onHtml = ( html ) => {

            this.html = html
            this.afterDownload ( )

            let zip = new LoadJavaScriptZips ( this.config ).start ( )
            zip.then ( () => this.loadFonts ( this ) )
        }


        Promise.all( [

                new LoadCSS ( this.config, css_path ).start ( ),
                new LoadHTML ( this.config, html_path ).start ( ),
                new LoadJavaScripts ( this.config ).start ( )
            ]
        ).then(
            ( [ css_text, html_text, yo ] ) => {
                onHtml ( html_text )
            }
        )//.catch(err => { console.log( err ) } )
    }

    loadFonts ( ) {

        const finish = ( ) => this.onLoad ( this )
        new Fonts ( this.config ).start ( ).then ( () => finish ( )  )
    }

    afterDownload ( ) {

        //console.log ( this.html )
        this.container.innerHTML = this.html
        this.app3d_container = document.getElementById(

            "app3d_container"
        )
        this.app3d_render_container = document.getElementById(

            "app3d_render_container"
        )
    }
}

export default Prepare
