AFRAME.registerComponent("add-walls", {
    init: function () {
      const scene = document.querySelector('a-scene')
      const numWalls = 100
      let size = 20
  
      let wallHolder = document.createElement('a-entity')
      scene.appendChild(wallHolder)
      for (let i = 1; i < numWalls; i++) {
        let wall = document.createElement('a-box')
        wall.setAttribute('position', `0 0 ${10 + i * 10}`)
        wall.setAttribute('scale', `${0} ${0} 2`)
        wall.setAttribute('src', '#gradient2')
        wall.setAttribute('shadow', 'cast: true; receive: true;')
        wall.setAttribute('material', 'color: white; transparent: true; opacity: 0.8')
        //wall.setAttribute('fall-on-touch', '')
  
        let toSize = 1.5 * size
        let dur = 2000
        let delay = i * 300
        wall.setAttribute('animation', {
          property: 'scale',
          to: toSize.toString() + ' ' + toSize.toString() + ' 2',
          //easing: 'easeOutElastic',
          //easing: 'linear',
          easing: 'easeInOutQuad',
          delay: delay,
          dir: 'alternate',
          dur: dur,
          loop: true
        });
  
        wallHolder.appendChild(wall)
      }
    }
  })