AFRAME.registerComponent("rain", {
    init: function () {
      
        // initial variable declaration
        let sceneEl = document.querySelector('a-scene');
        let size = 15;
        // min/max values for random cube position
        let minX = -200;
        let maxX = 200;
        let minY = 50;
        let maxY = 90;
        let minZ = -350;
        let maxZ = 150;
        let spawnButton = this.el

        setTimeout(() => {
            clearInterval(populate)
        }, 10000)
        
        let populate = setInterval((e) => {
            // create a new a-entity
            let cube = document.createElement('a-entity');
            // set attributes of the new a-entity, like geometry, size, position and color
            cube.setAttribute('geometry', {
                        primitive: 'box',
                        height: '0.1',
                        width: '0.1',
                        depth: '0.1',
                    });
            cube.setAttribute('material', {
                color: '#ed1b24'
            });
            
            // create random x, y, z position values within range:
            let posX = Math.random() * (maxX - minX) + minX;
            let posY = Math.random() * (maxY - minY) + minY;
            let posZ = Math.random() * (maxZ - minZ) + minZ;
            
            cube.setAttribute('position', posX.toString()+ ' '+posY.toString()+' '+posZ.toString());
            cube.setAttribute('animation', {
                property: 'scale',
                to: size.toString()+ ' '+size.toString()+' '+size.toString(),
                easing: 'easeOutElastic',
                dur: '500'
            });
            //cube.setAttribute('fall-on-touch', '')
            //cube.setAttribute("dynamic-body", "friction: 0.1; restitution: 0.5")

            sceneEl.appendChild(cube)
            
            /*setTimeout(() => {
                cube.setAttribute('animation', {
                    property: 'scale',
                    to: '0 0 0',
                    easing: 'easeOutElastic',
                    dur: '1000'
                })
                //sceneEl.removeChild(cube)
            }, 10000);*/
        }, 1)
    },
  })