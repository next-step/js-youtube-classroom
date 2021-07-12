export function qs(selector, scope=document){
  if(!selector) throw 'no Selector'
  return scope.querySelector(selector)
}
export function on(target, eventName, handler){
  if(!target) throw 'no target'
  target.addEventListener(eventName, handler)
}
export function emit(target, eventName, detail){
  if(!target) throw 'no target'
  const event = new CustomEvent(eventName, {detail})
  target.dispatchEvent(event)
}
export function qsAll(selector, scope=document){
  if(!selector) throw 'no Selector'
  return scope.querySelectorAll(selector)
}

export function getCookie(cookieName){
  try{
    const cookieValue = document.cookie
    .replace(/ /, "")
    .split(';')
    .map(el=>el.split('='))
    .find(row=> row[0].startsWith(cookieName))[1]
    .split(',')
    return cookieValue
  } catch(e){
    return false
  }
}
export function setCookie(logtype, cookieNames){
  // console.log('setcookie')
  document.cookie = `${logtype}=${[...cookieNames].join(',')}; max-age=60*60`
}