let hexColor = '';
let schemaDivStr = '';
let baseColor = '';

function setBaseColorControl(color) {
  document.getElementById('result').style.backgroundColor = color;
}

function resetSchema() {
  schemaDivStr = '';
  renderSchema();
}

function renderSchema() {
  document.getElementById('root').innerHTML = schemaDivStr;
}

function buildSchemaDiv(val) {
  schemaDivStr += `<div class="schema-color" style="background-color: ${val};"><div>${val}</div></div>`;
}

function populateShema(val) {
  const {colors} = val;
  colors.forEach(val => buildSchemaDiv(val.hex.value));
  renderSchema();
}

const getColorScheme = function(color) {
  let _color = color.replace('#', '');
  let colorSchemType = document.getElementById('type').value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${_color}&mode=${colorSchemType.toLowerCase()}&count=4`
  )
    .then(response => response.json())
    .then(data => populateShema(data));
};

document.getElementById('color-selector').addEventListener('submit', e => {
  e.preventDefault();
  resetSchema();
  hexColor = document.getElementById('color-value').value;
  getColorScheme(hexColor);
});
