AFRAME.registerComponent("cloud", {
    init: function () {
      
        // initial variable declaration
        let sceneEl = document.querySelector('a-scene')
        let size = 10
        // min/max values for random cube position
        let minX = -50
        let maxX = 50
        let minY = 50
        let maxY = 90
        let minZ = -50
        let maxZ = 50

        let cloud = document.createElement('a-entity')
        cloud.id = 'cloud'
        sceneEl.appendChild(cloud)
        
        let i = 1
        setInterval(() => {
            // create a new a-entity
            let cube = document.createElement('a-entity')
            cube.classList.add('cloud-cube')

            // create base geometry
            cube.setAttribute('geometry', {
                        primitive: 'box',
                        height: '0.1',
                        width: '0.1',
                        depth: '0.1',
                    })
            cube.setAttribute('material', {
                color: '#ed1b24'
            })
            
            // create random x, y, z position values within range:
            let posX = Math.random() * (maxX - minX) + minX
            let posY = Math.random() * (maxY - minY) + minY
            let posZ = Math.random() * (maxZ - minZ) + minZ
            
            cube.setAttribute('position', posX.toString()+ ' '+posY.toString()+' '+posZ.toString());
            cube.setAttribute('animation', {
                property: 'scale',
                to: size.toString()+ ' '+size.toString()+' '+size.toString(),
                easing: 'easeOutElastic',
                dur: '500'
            })

            // animation on click
            cube.addEventListener('mouseenter', () => {
                cube.setAttribute('animation', {
                    property: 'scale',
                    to: '0 0 0',
                    easing: 'easeOutElastic',
                    dur: '1000'
                })
            })

            // fall after a set time 
            setTimeout(() => {
                cube.setAttribute("dynamic-body", "mass: 1")
            }, 15000);

            cloud.appendChild(cube)

            // update gen values
            /*let incr = 1
            minX -= incr
            maxX += incr
            minY += incr
            maxY += incr
            minZ -= incr
            maxZ += incr*/

            i++
            size++
        }, 100 / (1 * i))
    },
})