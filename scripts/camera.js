AFRAME.registerComponent('camera-listener', {
    tick: function () {
        let cameraEl = this.el.sceneEl.camera.el
        let pos = cameraEl.getAttribute('position')
    
        let posStr = `${pos.x} ${pos.y} ${pos.z}`

        console.log(posStr)

        // update camera entity pos to be same as camera pos
        let cameraEntity = document.getElementById('camera-entity')
        //cameraEntity.setAttribute('position', posStr)

        // make cloud follow camera position with delayed movement
        let moveAnim = {
            property: 'position',
            to: posStr,
            easing: 'easeOutElastic',
            //easing: 'linear',
            //easing: 'easeInOutQuad',
            delay: 0,
            //dir: 'alternate',
            dur: 3000,
            loop: false
        }
        if (document.getElementsByClassName('cloud-cube').length < 600) {
            document.getElementById('cloud').setAttribute('animation', moveAnim)
        }
        // set static cloud to be same pos as cloud before it appears
        if (document.getElementsByClassName('static-cloud-cube') == 0) {
            document.getElementById('static-cloud').setAttribute('animation', moveAnim)
        }

        let rotateAnim = {
            property: 'rotation',
            to: '90 0 0',
            easing: 'easeOutElastic',
            //easing: 'linear',
            //easing: 'easeInOutQuad',
            delay: 0,
            //dir: 'alternate',
            dur: 3000,
            loop: false
        }
        
        if (pos.z < -402) {
            cameraEl.setAttribute('dynamic-body', '')
            /*cameraEntity.setAttribute('animation', rotateAnim)
            
            let newPosStr = `${pos.x} ${pos.y} 0`
            cameraEl.setAttribute('position', newPosStr)*/
        } else {
            //cameraEntity.setAttribute('rotation', '0 0 0')
        }
    }
});