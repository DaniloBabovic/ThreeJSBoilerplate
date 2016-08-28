import Download from './download.js'

class LoadHTML{

    constructor ( config, realtivePath ) {

        this.realtivePath = realtivePath
        this.rootURL = config.rootURL
        this.URL = this.rootURL + this.realtivePath + '?' + Date.now()
    }

    start ( ) {

        let URL = this.URL
        let onDownload = ( resolve, reject, err, response, body ) => {
            this.onDownload ( resolve, reject, err, response, body )
        }
        return new Promise(

            function (resolve, reject) {

                let onDone = ( err, response, body ) => {
                    onDownload ( resolve, reject, err, response, body )
                }
                new Download (URL, onDone)
            }
        )
    }

    onDownload ( resolve, reject, err, response, body ) {

        if ( err != null ) {

            reject ( err )

        } else {

            resolve ( body )
        }
    }
}

export default LoadHTML
