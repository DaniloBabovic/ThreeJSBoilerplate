//import THREE from 'three'

class Lights {

    constructor ( app ) {

        this.app = app

        // Light JSON params from: three_app/config/scene.json
        this.spot_lights_json = app.config.scene.spot_lights
        this.point_lights_json = app.config.scene.point_lights

        this.spotlights = []
        this.lightTargets = []

        this.pointLights = []

        this.insertAmbientLight ( )
        this.insertSpotLights ( )
        this.insertPointLights ( )
    }

    insertAmbientLight ( ) {

		this.ambientLight = new THREE.AmbientLight (

			new THREE.Color ( this.app.config.scene.ambientLight )
		)
		this.app.renderer.rendererGL.setClearColor ( 0x989898)
		this.app.scene.add ( this.ambientLight )
	}

    insertSpotLights ( ) {

        /*

            JSON

            "color":        "#CCCCCC",
            "position":     [ 0, 800, 0 ],
            "intensity":    0,
            "distance":     1300,
            "angle":        0.2,
            "exponent":     1,
            "decay":        0.2,
            "tar_position": [ -400, 0, 0 ]

        */

        const insertSpotLight = ( data ) => {

            let spotlight = new THREE.SpotLight ( data.color )

            spotlight.position.set ( ...data.position )
            spotlight.intensity = data.intensity
            spotlight.distance = data.distance
            spotlight.angle = data.angle
            spotlight.exponent = data.exponent
            spotlight.decay = data.decay

            this.app.scene.add ( spotlight )
            this.spotlights.push ( spotlight )

            let lightTarget = new THREE.Object3D ( )

            lightTarget.position.set ( ...data.tar_position )
            this.app.scene.add ( lightTarget )
            spotlight.target = lightTarget
            this.lightTargets.push ( lightTarget )
        }

        for ( let key in this.spot_lights_json ) {

            let data = this.spot_lights_json [ key ]
            insertSpotLight ( data )
        }
        this.app.render()
    }

    insertPointLights ( ) {

        /*
        "point_lights" : {

            "_1": {
                "color":        "#ffffff",
                "position":     [ 120, 60, 0 ],
                "intensity":    1,
                "distance":     150,
                "decay":        0.4
            },
        */
        const insertPointLight = ( data ) => {

            let pointlight = new THREE.PointLight (

                data.color,
                data.intensity,
                data.distance
            )

            pointlight.position.set ( ...data.position )
            pointlight.decay = data.decay

            this.app.scene.add ( pointlight )
            this.pointLights.push ( pointlight )
        }

        for ( let key in this.point_lights_json ) {

            let data = this.point_lights_json [ key ]
            insertPointLight ( data )
        }
        this.app.render()
    }
}

export default Lights
