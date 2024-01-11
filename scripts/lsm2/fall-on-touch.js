AFRAME.registerComponent("fall-on-touch", {
    init: function () {
  
      // initial variable declaration
      let el = this.el
  
      el.addEventListener('click', (e) => {
        el.setAttribute("dynamic-body", "mass: 10")
      })
    }
  })