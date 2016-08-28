import JSZipUtils from '../JSZipUtils.js'
import Common from '../common.js'

class DownloadObjZip {

    constructor ( config, onProgress = null ) {

        this.config = config
        this.onProgress = onProgress

        this.obj_zip_path = this.config.data.obj_zip_path
        this.objects_3d = this.config.data.objects_3d

        this.setPromise ( )
    }

    setPromise ( ) {

        const setPromiseFunctions = ( resolve, reject ) => {

            this.resolve = resolve
            this.reject = reject
        }
        this.promise = new Promise(

            ( resolve, reject ) => { setPromiseFunctions ( resolve, reject ) }
        )
    }

    start ( ) {

        if ( Common.isEmpty (this.obj_zip_path) ) {

            this.resolve ( )

        } else {

            this.downloads = []
            this.download ( )
        }
        return this.promise
    }

    download ( ) {

        const updateProgress = ( evt ) => {
            if (this.onProgress != null ) {

                this.onProgress( evt )

            } else {

                console.log ( evt )

            }
        }
        const unzip = ( ) => this.unzip ( )
        const getZipFiles = ( data ) => this.getZipFiles ( data )
        const onData = (err, data) => {

            if ( err ) console.log ( 'JSZipUtils error', err )
            else  getZipFiles ( data )

        }

        JSZipUtils.getBinaryContent(

            this.obj_zip_path,
            onData,
            updateProgress
        )
    }

    unZip ( zipInfo ) {

        this.fileList = zipInfo.fileList
        this.onProgress( null, "Decompressing ..." )
        const onZipDone = ( data ) => this.onZipDone ( data )
        let jsonDataList = []
        for ( let i = 0; i < zipInfo.fileList.length; i++ ) {

            let fileName = zipInfo.fileList [ i ]
            let jsonData = zipInfo.zip.file( fileName ).async("string")
            jsonDataList.push ( jsonData )

        }
        Promise.all( jsonDataList ). then ( (data ) =>  { onZipDone ( data ) } )
    }

    getZipFiles ( data ) {

        const unZip = ( zip, fileList) => this.unZip ( zip, fileList)
        const readZipFiles = ( zip ) => {

            let fileList = Common.getObjectsKeys ( zip.files )
            let zipInfo = {
                fileList : fileList,
                zip : zip
            }
            return zipInfo
        }
        JSZip.loadAsync( data ).then ( readZipFiles ).then ( unZip )
    }

    onZipDone ( data ) {

        const resolve = ( ) => this.resolve ( [data, this.fileList] )
        this.onProgress( null, "Decompression done. " )
        setTimeout (resolve, 700)
    }
}

export default DownloadObjZip
