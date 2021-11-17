const input = document.querySelector('#input');
const run = document.querySelector('#run');

const unwantedKeys = ['GeneratedUniqueId', 'gisKeyName'];
const unwantedValues = [0, false, null];

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
    if (0 <= unwantedKeys.indexOf(key)) {
      console.log('delete', key);
      delete parent[key];
      return;
    }
    if (0 <= unwantedValues.indexOf(child)) {
      console.log('delete', key);
      delete parent[key];
      return;
    }
    switch (typeof child) {
      case 'object':
        Object.entries(child).forEach(([key, value]) => strip(child, key));
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
