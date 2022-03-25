// Array of Object to Object
// Ex let pa = [
// { id: 123, name: "dave", age: 23 },]

export const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})
const peopleObject =  arrayToObject(peopleArray, "id")
//Array of Object to array
//aa = [{id:1, name:"a"},{id:2, name:"b"},{id:3, name:"c"}]
//console.log(aa.map( Object.values ))
//      items : this.props.countries.filter(lov => lov.id < 4).map(lookup => ({ id: lookup.id, content: lookup.name })).map(Object.values),
