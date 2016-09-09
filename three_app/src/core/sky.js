class Sky {

    constructor ( app ) {

        this.app = app
        this.scene = app.scene
        this.skyBoxMaterialName = app.config.scene.skyBoxMaterialName

        this.env_texture = app.textures.getEnvTexture (
            this.skyBoxMaterialName
        )
        
        this.getCubeMap ()
        this.getMaterial ( )

        this.skyBox = new THREE.Mesh(

            new THREE.CubeGeometry( 3000, 3000, 3000 ),
            this.skyBoxMaterial
        )
        this.scene.add ( this.skyBox )
    }

    getMaterial ( ) {

        let cubeShader = THREE.ShaderLib['cube'];
        cubeShader.uniforms['tCube'].value = this.cubeMap

        this.skyBoxMaterial = new THREE.ShaderMaterial ( {
                fragmentShader: cubeShader.fragmentShader,
                vertexShader: cubeShader.vertexShader,
                uniforms: cubeShader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            }
        )
    }

    getCubeMap ( ) {

        const getSide = (x, y, size, image) => {

            var canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            var context = canvas.getContext('2d');
            context.drawImage(image, -x * size, -y * size);

            return canvas;

        };

        this.cubeMap = new THREE.Texture([])
        this.cubeMap.format = THREE.RGBFormat;
        this.cubeMap.flipY = false;

        let size = this.env_texture.size
        let image = this.env_texture.image

        this.cubeMap.image[ 0 ] = getSide( 2, 1, size, image ) // px
        this.cubeMap.image[ 1 ] = getSide(0, 1, size, image ) // nx
        this.cubeMap.image[ 2 ] = getSide(1, 0, size, image ) // py
        this.cubeMap.image[ 3 ] = getSide(1, 2, size, image ) // ny
        this.cubeMap.image[ 4 ] = getSide(1, 1, size, image ) // pz
        this.cubeMap.image[ 5 ] = getSide(3, 1, size, image ) // nz
        this.cubeMap.needsUpdate = true;
    }
}

export default Sky
