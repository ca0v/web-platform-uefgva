const input = document.querySelector('#input');
const run = document.querySelector('#run');

const unwantedKeys = ['GeneratedUniqueId', 'gisKeyName'];
const unwantedValues = [0, false, null];
const stripnull = {};

run.addEventListener('click', () => {
  const value = input.value;
  try {
    let json = [eval][0](`(${value})`);
    json = strip(json);
    const result = JSON.stringify(json, null, ' ');
    input.value = result;
  } catch (ex) {
    console.error(ex);
  }
});

run.click();

function strcmp(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function sortKeys(parent) {
  return Object.keys(parent).sort((a1, b1) => {
    const [a, b] = [parent[a1], parent[b1]];
    if (typeof a === 'object' && typeof b !== 'object') {
      return 1;
    }
    if (typeof a !== 'object' && typeof b === 'object') {
      return -1;
    }
    return strcmp(a1, b1);
  });
}

function strip(parent, key) {
  if (key) {
    const child = parent[key];
    if (0 <= unwantedKeys.indexOf(key)) {
      return stripnull;
    }
    if (0 <= unwantedValues.indexOf(child)) {
      return stripnull;
    }
    switch (typeof child) {
      case 'object':
        const result = sortKeys(child)
          .map((key) => [key, strip(child, key)])
          .filter(([key, value]) => value != stripnull);
        return Array.isArray(child)
          ? result.map(([key, value]) => value)
          : Object.fromEntries(result);
      default:
        console.log('unmapped', key, child);
        return child;
    }
  } else {
    switch (typeof parent) {
      case 'object':
        return Object.fromEntries(
          sortKeys(parent)
            .map((key) => [key, strip(parent, key)])
            .filter(([key, value]) => value != stripnull)
        );
      default:
        break;
    }
  }
}
