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