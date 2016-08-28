import JSZipUtils from '../JSZipUtils.js'
import Common from '../common.js'

class LoadJavaScriptZips {

    constructor ( config ) {

        this.config = config
        this.scriptPaths = this.config.data.script_zip
        this.setPromise ( )
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

    start ( ) {

        if ( Common.isEmpty (this.scriptPaths) ) {

            this.resolve ( )

        } else {

            this.downloads = []
            this.loop ( )
        }
        return this.promise
    }

    loop ( ) {

        for ( let i = 0; i < this.scriptPaths.length; i++ ) {

            let path = this.scriptPaths [ i ]
            let item = {

                path: path,
                loaded: false
            }
            this.downloads.push ( item )
            this.downloadScript ( item )
        }
    }

    downloadScript ( item ) {

        const updateProgress = ( evt ) => {
            //console.log ( evt )
        }
        const unzip = ( data, item ) => this.unzip ( data, item )

        JSZipUtils.getBinaryContent(

            item.path,
            (err, data) => {

                if(err) {

                    console.log ( 'JSZipUtils error', err )

                } else {

                    unzip ( data, item )
                }
            },
            updateProgress
        )
    }

    getFileName ( item ) {

        let index  = item.path.lastIndexOf("/");
        let js_file_name = item.path
        js_file_name = js_file_name.replace(".zip", "")

        if (index > 0) {

            js_file_name = js_file_name.substring(index + 1)
        }
        return js_file_name
    }

    unzip ( data, item ) {

        const insertScript = ( text, item ) => this.insertScript ( text, item )
        let js_file_name = this.getFileName ( item )
        JSZip.loadAsync( data ).then (

            ( zip ) => {

                return zip.file( js_file_name ).async("string")
            }
        ).then (

            ( text ) => insertScript ( text, item )
        )
    }

    insertScript ( text, item ) {

        console.log ( item.path + ' decompress done.' )

        let script = document.createElement('script')
        script.type = "text/javascript";
        script.appendChild( document.createTextNode(text) )
        script.setAttribute ( "id", item.path )
        document.body.appendChild(script)

        item.loaded = true
        this.onLoad ( item )
    }

    onLoad ( item ) {

        for ( let i = 0; i < this.downloads.length; i++ ) {

            let item = this.downloads[i]
            if ( item.loaded == false ) return
        }
        this.resolve ( )
    }
}

export default LoadJavaScriptZips
