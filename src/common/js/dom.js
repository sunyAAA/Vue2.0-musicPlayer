export function addClass(el,className){
  if(hasClass(el,className)){
    return
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

export function hasClass(el,className){
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className);
}

export function getData(el,name,val){
  const prefix = 'data-'
  name = prefix+name
  if(val){
    return el.setAttribute(name,val)
  }else{
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

let vendor = (()=>{
  let transformStyle = {
    webkit : 'webkitTransform',
    Moz : 'mozTransform',
    O : 'OTransform',
    ms : 'msTransform',
    standard : 'transforom'
  }
  for(let key in transformStyle){
    if(elementStyle[transformStyle[key]] !== undefined){
      return key
    }
  }
  return false
})()
// transform 自动添加前缀
export function prefixStyle(style){
  if(vendor === false){
    return false
  }

  if(vendor === 'standard'){
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}