import Detector from './detector.js'

const checkPrerequest = () => {

    let hasWebGL = Detector.canvas && Detector.webgl;

    if (!hasWebGL) {

        container.loadingDiv.show()
        container.loadingDiv.setMessage(
            container.parentcontainer.getAttribute(
                !window.WebGLRenderingContext ? "data-gpu" : "data-webgl"
            )
        )
        return false

    } else {

        return true
    }
}

export default checkPrerequest
