AFRAME.registerComponent('oculus-button-listeners', {
    init: function () {
        let el = this.el
        let numRotations = 1 // track camera rotations

        // Button events
        el.addEventListener("abuttondown", () => {
            this.toggleEnvr(numRotations)
            numRotations++
        })
        el.addEventListener("bbuttondown", () => {
            this.toggleEnvr(numRotations)
            numRotations++
        })
        el.addEventListener("xbuttondown", () => {
            this.toggleEnvr(numRotations)
            numRotations++
        })
        el.addEventListener("ybuttondown", () => {
            this.toggleEnvr(numRotations)
            numRotations++
        })
    }, 
    toggleEnvr: (numRotations) => {
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
    
            setTimeout(() => {
                // alter environment
                sceneEl.setAttribute('fog', 'type: exponential; color: gray; density: .01;')
                ba.setAttribute('intensity', '0')
                document.querySelector('#cloud').setAttribute('scale', '1 1 1')
                document.querySelector('#static-cloud').setAttribute('scale', '0 0 0')
            }, 250);
        }
    }
})