
class Materials {

    constructor ( app ) {

        this.app = app
        this.materials = []
    }

    getMaterial ( name_custom ) {

        for ( let i = 0; i <  this.materials.length; i++ ) {

            if ( this.materials[i].name_custom == name_custom ) {

                return this.materials[i].material
            }
        }
        return null
    }

    getReusableMaterial (

        materialName,
        name_custom,
        materialParams,
        env_map_name = "",
        map_name = ""
    ) {

        let exist = this.getMaterial ( materialName )
        if ( exist != null) return exist

        let MaterialClass
        if ( materialName == "MeshPhongMaterial") {

            MaterialClass = THREE.MeshPhongMaterial

        } else if ( materialName == "MeshStandardMaterial") {

            MaterialClass = THREE.MeshStandardMaterial
        }
        //.. TODO more materials

        if ( env_map_name != "") {

            if ( env_map_name == 'sky_box') {
                var cubeMap = this.app.sky.cubeMap
                materialParams.envMap = cubeMap
            }
            //.. TODO load env material
        }

        // if ( map_name != "") {
        //
        //     let texture = this.app.textures.getTexture ( map_name )
        //     materialParams.map = texture.texture
        // }

        let material = new MaterialClass ( materialParams )

        this.materials.push ( { name_custom, material } )
        return material
    }
}

export default Materials
