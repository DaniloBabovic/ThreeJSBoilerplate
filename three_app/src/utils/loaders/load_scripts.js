
class LoadJavaScripts {

    constructor ( config ) {

        this.config = config
        this.scriptPaths = this.config.data.scripts
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

        if ( (this.scriptPaths == null ) || ( this.scriptPaths.length == 0 ) ) {

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
            this.loadScript ( item )
        }
    }

    loadScript ( item ) {

        let script = document.createElement('script')
        script.src = item.path
        script.onload = ( )  => {

            item.loaded = true
            this.onLoad ( item )
        }
        document.head.appendChild(script);
    }

    onLoad ( item ) {

        //console.log('loaded !!! ' + item.path )

        for ( let i = 0; i < this.downloads.length; i++ ) {

            let item = this.downloads[i]
            if ( item.loaded == false ) return
        }
        this.resolve ( )
    }
}

export default LoadJavaScripts
