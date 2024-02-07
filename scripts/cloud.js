AFRAME.registerComponent("cloud", {
    init: function () {
      
        // initial variable declaration
        let sceneEl = document.querySelector('a-scene')

        let mouseDown = 0
        // mouse events for modifying cursor
        sceneEl.addEventListener('mousedown', () => {
            mouseDown++
            // change cursor color
            let cursor = document.getElementById('camera-cursor')
            cursor.setAttribute('material', 'color: white; opacity: .5; shader: flat')
        })
        sceneEl.addEventListener('mouseup', () => {
            mouseDown--
            // change cursor color
            let cursor = document.getElementById('camera-cursor')
            cursor.setAttribute('material', 'color: black; opacity: .5; shader: flat')
        })

        // detect if mouse is down
        //document.body.onmousedown = () => mouseDown++
        //document.body.onmouseup = () => mouseDown--

        let cloud = document.createElement('a-entity')
        cloud.id = 'cloud'
        sceneEl.appendChild(cloud)
        
        let i = 1 // initial spawn rate
        let size = 10 // initial size of cube

        // Variables for calculating generation rate
        const MAXBUF = 10000
        const MINBUF = 0
        const BUFFER = Math.random() * (MAXBUF - MINBUF) + MINBUF
        const MAXLIM = 100
        const MINLIM = 1
        const LIMIT = Math.random() * (MAXLIM - MINLIM) + MINLIM
        
        let generationInterval // incremental cube generation
        let timeChangeInterval = 500 // amount of time before cube gen interval changes
        setInterval(() => {
            clearInterval(generationInterval)

            // Set incremental size increase
            let sizeIncr = 1 - 0.5 / i
            sizeIncr = 0.5
            sizeIncr = 1
                
            // Set time passed before next cube generates
            let nextInterval = 100  
            //nextInterval = 100 / i 
            nextInterval = LIMIT + (BUFFER / i)

            generationInterval = setInterval(() => {
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

                // add superhands interaction mixin
                //cube.setAttribute('mixin', 'all-interactions')

                // min/max values for random cube position
                let minX = -50
                let maxX = 50
                let minY = 50
                let maxY = 90
                let minZ = -50
                let maxZ = 50
                
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

                // on mouse down event
                cube.addEventListener('mousedown', () => {
                    mouseDown = 1
                        // despawn animation 
                        cube.setAttribute('animation', {
                            property: 'scale',
                            to: '0 0 0',
                            easing: 'easeOutElastic',
                            dur: '1000'
                        })
                        // remove cube from DOM after anim
                        setTimeout(() => {
                            cube.parentNode.removeChild(cube)
                        }, 1000)
                })
                cube.addEventListener('mouseenter', () => {
                    console.log(mouseDown)
                    // check if mouse is down
                    if (mouseDown > 0) {
                        mouseDown = 1
                        // despawn animation 
                        cube.setAttribute('animation', {
                            property: 'scale',
                            to: '0 0 0',
                            easing: 'easeOutElastic',
                            dur: '1000'
                        })
                        // remove cube from DOM after anim
                        setTimeout(() => {
                            cube.parentNode.removeChild(cube)
                        }, 1000)
                    }
                })

                cloud.appendChild(cube)

                // fall after a set time 
                let fallInterval = 15000 /*+ 10000 / i*/
                setTimeout(() => {
                    cube.setAttribute("dynamic-body", "mass: 1")
                }, fallInterval /*15000*/)

                // update gen values
                /*let incr = 1
                minX -= incr
                maxX += incr
                minY += incr
                maxY += incr
                minZ -= incr
                maxZ += incr*/

                size += sizeIncr
            }, nextInterval)

            i++
        }, timeChangeInterval)
    },
})