import DownloadObjZip from '../utils/loaders/download_obj_zip.js'
import Common from '../utils/common.js'
import RotateAnimation from '../animations/rotate.js'

class Models {

    constructor ( app ) {

        this.app = app
        this.scene = app.scene

        this.models = []

        this.insertModelGroup ( )
        const onProgress = ( event, text ) => this.onProgress ( event, text )
        const onDownloadDone = ( jsonData ) => this.onDownloadDone ( jsonData )

        new DownloadObjZip ( this.app.config, onProgress ).start ().
        then ( ( jsonData ) => onDownloadDone ( jsonData ) )
    }

    insertModelGroup ( ) {

        this.group = new  THREE.Object3D ()
        this.scene.add ( this.group )
    }

    onProgress ( event, text ) {

        //console.log ( "onProgress: ", event )
        this.app.progress.onProggresEvent ( event, text )
    }

    onDownloadDone ( jsonData ) {

        let jsonS = jsonData[0]
        let fileNames = jsonData[1]

        this.jsonData =  jsonData
        this.currentIndex = -1
        this.next ( )
    }

    next ( ) {

        let jsonS = this.jsonData[0]
        let fileNames = this.jsonData[1]

        this.currentIndex += 1
        if (this.currentIndex >= jsonS.length ) {
            this.finish ()
            return
        }
        let json = JSON.parse( jsonS[ this.currentIndex ] );
        let fileName = fileNames[ this.currentIndex ]

        this.app.progress.onProggresEvent ( null, fileName )
        const load = ( ) => {

            this.loadObject ( json, fileName )
        }
        setTimeout ( load, 400 )
    }

    finish ( ) {

        let nextAnimation =  ( ) => this.nextAnimation ( )
        this.app.progress.remove ( )

        let targets = {

            group : this.group,
            crown : this.models [ 0 ],
            ring : this.models [ 1 ]
        }
        new RotateAnimation ( this.app, targets, nextAnimation )
    }

    nextAnimation ( ) {

        console.log ( "nextAnimation started" )
    }

    loadObject ( json, fileName ) {

        // Object 3D JSON params from: three_app/config/config.json
        let data = this.app.config.data.objects_3d[ fileName ]
        let materialParams = data.material.params
        let material = this.app.materials.getReusableMaterial (

             data.material.name,
             data.material.name_custom,
             data.material.params,
             data.material.env_map_name
        )

        let object = new THREE.JSONLoader().parse ( json )
        object.geometry.center( )

        let mesh = new THREE.Mesh( object.geometry, material );

        mesh.position.set ( ...data.position )
        mesh.rotation.set ( ...Common.piMultiply ( data.rotation ) )
        mesh.scale.set ( ...data.scale )
        this.group.add( mesh );
        this.models.push ( mesh )

        this.app.render ( )
        this.next ()
    }
}

export default Models
