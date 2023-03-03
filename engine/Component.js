class Component{
  name = ""
  parent
  started = false

  //animal.name = "Fido"  if name is public
  //animal.setName("Fido") coorect Java encapsulation
  //animal.name = "Fido" using properties
  get transform(){
      return this.parent.components[0]
  }
  //no "set transform(newTransform)" makes property effectively read-only
}

window.Component = Component;
