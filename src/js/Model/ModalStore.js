export default class ModalStore{
  constructor(storage){
    if(!storage) throw 'no storage'
    
    this.storage = storage
  }

}