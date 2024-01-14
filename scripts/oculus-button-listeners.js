AFRAME.registerComponent('oculus-button-listeners', {
    init: function () {
        var el = this.el;
        el.addEventListener('xbuttondown', function (evt) {
            el.setAttribute('visible', !el.getAttribute('visible'));
        });

        let cameraEntity = document.getElementById('camera-entity')
        let numRotations = 1;

        document.addEventListener("xbuttondown", () => {
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
    }
  });