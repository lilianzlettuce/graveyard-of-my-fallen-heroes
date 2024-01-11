AFRAME.registerComponent("add-lamps", {
    init: function () {
        const scene = document.querySelector('a-scene')
        const numlamps = 7//max 8
        let dist = 100
        dist = 50
    
        let lampHolder = document.createElement('a-entity')
        scene.appendChild(lampHolder)
        
        for (let i = 0; i < numlamps; i++) {
            let dur = 2000
            let delay = i * 1000

            // lamp object
            let lamp = document.createElement('a-entity')
            lamp.classList.add('lamp')
            lamp.setAttribute('position', `0 0 ${-15 - dist * i}`)
            lamp.setAttribute('shadow', 'cast: true; receive: true;')

            let lampOffset = 3
            let lampHeadOffset = 0
            let lampHead = document.createElement('a-sphere')
            lampHead.setAttribute('position', `${lampHeadOffset + lampOffset} 20 0`)
            lampHead.setAttribute('radius', '1.25')
            lampHead.setAttribute('material', 'color: white;')

            let lampPole = document.createElement('a-cylinder')
            lampPole.setAttribute('position', `${1.5 + lampOffset} 0 0`)
            lampPole.setAttribute('radius', '.5')
            lampPole.setAttribute('scale', '1 40 1')
            lampPole.setAttribute('material', 'color: gray;')
            
            let lampHilt = document.createElement('a-cylinder')
            lampHilt.setAttribute('position', `${1.5 + lampOffset} -14.8 0`)
            lampHilt.setAttribute('radius', '1.5')
            lampHilt.setAttribute('scale', '1 .5 1')
            lampHilt.setAttribute('material', 'color: gray;')

            lamp.appendChild(lampHead)
            lamp.appendChild(lampPole)
            lamp.appendChild(lampHilt)

            // physics 
            //lamp.setAttribute('dynamic-body', '')
            /*lampHead.setAttribute('dynamic-body', '')
            lampPole.setAttribute('dynamic-body', '')
            lampHilt.setAttribute('dynamic-body', '')*/

            // lamp lights
            let spotLight = document.createElement('a-light')
            spotLight.setAttribute('position', `0 2 0`)
            spotLight.setAttribute('intensity', '0')
            spotLight.setAttribute('rotation', '-90 0 0')
            spotLight.setAttribute('light', 'type:spot; angle:90; color:#e39910; decay: 0; distance: 70; penumbra: .1; castShadow:true;')
            spotLight.setAttribute('light', 'type:spot; angle:60; color:#e39910; decay: 0; distance: 70; penumbra: 0; castShadow:true;')
            spotLight.setAttribute('light', 'type:point; angle:60; color:#e39910; decay: .1; distance: 70; penumbra: 1; castShadow:true;')
            spotLight.setAttribute('light', 'type:spot; angle:60; color:#e39910; decay: .1; distance: 70; penumbra: 1; castShadow:true;')

            /*let spotLight2 = document.createElement('a-light')
            spotLight2.setAttribute('position', `0 2 0`)
            spotLight2.setAttribute('intensity', '2')
            spotLight2.setAttribute('rotation', '-90 0 0')
            spotLight2.setAttribute('light', 'type:spot; angle:30; color:yellow; castShadow:false;')*/
            
            let faceLight = document.createElement('a-light')
            faceLight.setAttribute('position', `${lampHeadOffset + lampOffset} 16 0`)
            faceLight.setAttribute('intensity', '0')
            faceLight.setAttribute('rotation', '90 0 0')
            faceLight.setAttribute('light', 'type:spot; angle:30; color:#ffab3d; decay: .5; distance: 50; penumbra: 1; castShadow:true;')

            /*let pointLight = document.createElement('a-light')
            pointLight.setAttribute('position', `0 12 0`)
            pointLight.setAttribute('intensity', '0')
            pointLight.setAttribute('light', 'type:point; color:white; castShadow:false;')*/

            lamp.appendChild(spotLight)
            //lamp.appendChild(spotLight2)
            lamp.appendChild(faceLight)
            //lamp.appendChild(pointLight)

            lamp.setAttribute('scale', '1 1 1')
    
            let lightAnim = {
                property: 'intensity',
                to: 3,
                //easing: 'easeOutElastic',
                //easing: 'linear',
                easing: 'easeInOutQuad',
                delay: delay,
                dir: 'alternate',
                dur: dur,
                loop: false
            }
            faceLight.setAttribute('animation', lightAnim)
            spotLight.setAttribute('animation', lightAnim)

            let maxDel = 16000
            let minDel = 0
            let maxDur = 10000
            let minDur = 4000

            let hoverAnim = {
                property: 'position',
                to: `${lampHeadOffset + lampOffset} 30 0`,
                //easing: 'easeOutElastic',
                //easing: 'linear',
                easing: 'easeInOutQuad',
                delay: Math.random() * (maxDel - minDel) + minDel,
                dir: 'alternate',
                dur: Math.random() * (maxDur - minDur) + minDur,
                loop: true
            }
            //lampHead.setAttribute('animation', hoverAnim)
    
            lampHolder.appendChild(lamp)
        }
    },
    update: function () {
        let lamps = document.getElementsByClassName('lamp')
        for (let i = 0; i < lamps.length; i++) {
            //lamps[i].setAttribute('scale', '2 2 2')
        }
    }
  })