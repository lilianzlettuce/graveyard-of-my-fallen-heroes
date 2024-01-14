AFRAME.registerComponent('oculus-button-listeners', {
    init: function () {
        let el = this.el
        el.addEventListener('xbuttondown', function (evt) {
            el.setAttribute('visible', !el.getAttribute('visible'));
        })

        let numRotations = 1

        // Button events
        el.addEventListener("xbuttondown", () => {
            let cameraEntity = document.getElementById('camera-entity')
            let sceneEl = document.querySelector('a-scene')
            let ba = document.querySelector('#blue-ambience')
            if (ba.getAttribute('intensity') == 0) {
                // change to blue environment 

                // camera flip anim
                cameraEntity.setAttribute('animation', {
                    property: 'rotation',
                    to: `${-360 * numRotations} 0 0`,
                    easing: 'easeOutElastic',
                    //easing: 'linear',
                    //easing: 'easeInOutQuad',
                    delay: 0,
                    //dir: 'alternate',
                    dur: 2000,
                    loop: false
                })
                numRotations++
        
                // alter environment
                setTimeout(() => {
                    sceneEl.setAttribute('fog', 'type: exponential; color: white; density: .01;')
                    ba.setAttribute('intensity', '2')
                    document.querySelector('#cloud').setAttribute('scale', '0 0 0')
                    document.querySelector('#static-cloud').setAttribute('scale', '1 1 1')
                }, 250);
                } else {
                // change to gray environment

                // camera flip anim
                cameraEntity.setAttribute('animation', {
                    property: 'rotation',
                    to: `${-360 * numRotations} 0 0`,
                    easing: 'easeOutElastic',
                    //easing: 'linear',
                    //easing: 'easeInOutQuad',
                    delay: 0,
                    //dir: 'alternate',
                    dur: 2000,
                    loop: false
                })
                numRotations++
        
                setTimeout(() => {
                    // alter environment
                    sceneEl.setAttribute('fog', 'type: exponential; color: gray; density: .01;')
                    ba.setAttribute('intensity', '0')
                    document.querySelector('#cloud').setAttribute('scale', '1 1 1')
                    document.querySelector('#static-cloud').setAttribute('scale', '0 0 0')
                }, 250);
            }
        })

        // Thumbstick movements
        this.el.addEventListener('thumbstickmoved', this.logThumbstick)
    }, 
    logThumbstick: function (evt) {
        let cameraEntity = document.getElementById('camera-entity')
        let cameraPos = cameraEntity.getAttribute('position').split(' ')
        let x = cameraPos[0]
        let y = cameraPos[1]
        let z = cameraPos[2]

        if (evt.detail.y > 0.95) { 
            // DOWN
            console.log('down thumb')
            z += 10
            cameraEntity.setAttribute('position', `${x} ${y} ${z}`)
        }
        if (evt.detail.y < -0.95) { 
            // UP
            z -= 10
            cameraEntity.setAttribute('position', `${x} ${y} ${z}`)
        }
        if (evt.detail.x < -0.95) { 
            // LEFT
            x -= 10
            cameraEntity.setAttribute('position', `${x} ${y} ${z}`)
        }
        if (evt.detail.x > 0.95) { 
            // RIGHT
            x += 10
            cameraEntity.setAttribute('position', `${x} ${y} ${z}`)
        }
    }
  });