const input = document.querySelector('#input');
const run = document.querySelector('#run');

const unwanted = ['GeneratedUniqueId'];

run.addEventListener('click', () => {
  const value = input.value;
  try {
    let json = [eval][0](`(${value})`);
    strip(json);
    const result = JSON.stringify(json, null, ' ');
    input.value = result;
  } catch (ex) {
    console.error(ex);
  }
});

run.click();

function strip(parent, key) {
  if (key) {
    const child = parent[key];
    console.log('strip', key, typeof child, child);
    if (unwanted.find(key)) {
      console.log('delete', key);
      delete parent[key];
      return;
    }
    switch (typeof child) {
      case 'number':
        if (child === 0) {
          delete parent[key];
        }
        break;
      case 'object':
        if (child === null) {
          delete parent[key];
        } else {
          Object.entries(child).forEach(([key, value]) => strip(child, key));
        }
        break;
      case 'undefined':
        //delete parent[key];
        break;
    }
  } else {
    switch (typeof parent) {
      case 'object':
        if (parent == null) return;
        Object.entries(parent).forEach(([key, value]) => strip(parent, key));

      default:
        break;
    }
  }
}
