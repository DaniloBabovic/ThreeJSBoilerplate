import Common from '../utils/common.js'

class RotateAnimation {

    constructor ( app, target, onDone ) {

        this.app = app
        this.target = target
        this.onDone = onDone

        this.camera = this.app.scene.camera.position
        this.camera_start = {

            x: this.camera.x,
            y: this.camera.y,
            z: this.camera.z,
        }

        this.offset = { x: 500, y: 500, z: 200 }

        this.camera_start_1 = {

            x: this.camera.x + this.offset.x,
            y: this.camera.y + this.offset.y,
            z: this.camera.z + this.offset.z
        }
        this.offset_1 = { x: -100, y: - 570, z: -570 }

        this.start ()
    }

    start ( ) {

        this.data = { val : 0, val_1 : 0 }
        const onPercent = () => this.update ( )
        const onComplete = () => this.onComplete ( )

        let params = {

            val: 360,
            val_1: 1,

            delay: 1,
            onUpdate : onPercent,
            onComplete : onComplete
        }

        var tween = TweenLite.to( this.data, 15, params)
    }

    update( ) {

        let degree = this.data.val
        let percent = this.data.val_1

        let rad =  Common.toRad ( degree )

        const  translate = ( percent ) => {

            this.camera.set (

                this.camera_start.x + this.offset.x * percent,
                this.camera_start.y + this.offset.y * percent,
                this.camera_start.z + this.offset.z * percent
            )
        }

        const translate_1 = ( percent ) =>  {

            this.camera.set (

                this.camera_start_1.x + this.offset_1.x * percent,
                this.camera_start_1.y + this.offset_1.y * percent,
                this.camera_start_1.z + this.offset_1.z * percent
            )
        }
        //Rotate
        this.target.group.rotation.y = rad
        this.target.crown.rotation.z = rad * 3.75
        this.target.ring.rotation.x = rad * 4

        if ( percent < 0.5 ) translate ( percent * 2 )
        if ( percent > 0.5 ) translate_1 ( ( percent - 0.5 ) * 2 )

        this.app.orbit.controls.update ( )
        this.app.render ()
    }

    onComplete () {

        //After animation
    }
}

export default RotateAnimation
