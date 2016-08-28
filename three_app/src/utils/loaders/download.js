
class Download {

    constructor ( url, onDone ) {

        let xmlhttp = new XMLHttpRequest()
        xmlhttp.responseType = 'text'

        xmlhttp.onreadystatechange = function() {

            xmlhttp.onreadystatechange = function() {

                if (xmlhttp.readyState === 4) {

                    if (xmlhttp.status === 200) {

                        onDone ( null, xmlhttp.status, xmlhttp.responseText)

                    } else {

                        onDone (

                            xmlhttp.statusText,
                            xmlhttp.status,
                            xmlhttp.responseText
                        )
                    }
                }
            }
        }

        xmlhttp.open('GET', url)
        xmlhttp.send()
    }
}

export default Download
