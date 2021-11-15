let words = ['aweseome','fantastic','cool']
let symbols = ['#','@','_','.','-','$'];


export function genUsername(name){
    let randomWord = words[Math.round(Math.random() * (words.length - 1))];
    let randomSymbol = symbols[Math.round(Math.random() * (symbols.length - 1))];
    let [firstname,lastname] = name.split(" ");

    return perm([firstname,lastname,randomWord,randomSymbol,String(Math.round(Math.random() * 100))])
}

function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if(!rest.length) {
      ret.push(xs[i])
    } else {
      for(let j = 0; j < rest.length; j = j + 1) {
        ret.push(xs[i].concat(rest[j]))
      }
    }
  }
  return ret;
}