
  const ui = SpreadsheetApp.getUi();


const toast = SpreadsheetApp.getActiveSpreadsheet().toast

function runner() {
  // renderComponents()
  console.log(component_deleteRangesButton())
}

function onOpen(e) {
  ui.createMenu('Delete Named Ranges')
  .addItem('Open Editor', 'window')
  .addToUi();
}

function window() {
  try {
    const htmlOutput = HtmlService
      .createHtmlOutput(renderComponents())
      .setWidth(400)
      .setHeight(400);
    ui.showModelessDialog(htmlOutput, 'Delete Named Ranges');
  } catch (err) {
    console.log(err)
  }
}

function component_checkbox(name) {
  let buffer = [
    `<input type="checkbox" id="delete" name="${name}">`,
    `<label for="delete">Delete ${name}</label><br><br>`
  ]

  return buffer.join('')
}

function component_rangeList(rangeListObject) {
  let rangeNames = Object.keys(rangeListObject)
  let rangeItemBuffer = []

  for (let i in rangeNames) rangeItemBuffer.push(component_checkbox(rangeNames[i]));

  return rangeItemBuffer.join('')
}

function component_deleteRangesButton() {

  let onclick = `onclick="c=[];Array(document.querySelectorAll('input'))[0].forEach((i)=>(i.checked) && c.push(i.name));(c.length>0) && google.script.run.showDeletionConfirmationDialog(c)";`
  
  let button = `<button ${onclick}>Delete Selected Ranges</button>`

  return button
}

function deletionWarning() {
  const msg = 'You are about to delete named ranges. Do you want to proceed?'
  const response = ui.prompt('Warning: ', msg, ui.ButtonSet.OK_CANCEL)

  if (response.getSelectedButton() === ui.Button.CANCEL) {
    console.log('user cancelled deletion')
    toast('These Named Ranges will not be deleted', 'Cancelled')
    return false
  } else {
    return true
  }
}

function deletionConfirmation() { toast('Named Ranges have been deleted', 'Success'); };

function renderComponents() {
  let buffer = [
    'Use the checkboxes below to select the Named Ranges ',
    'you would like to delete. You will be able to cancel ',
    'this action in the next step.<br><br>',
    '<form>',
    component_rangeList(retrieveAndFormatNamedRanges()),
    '<br><br>',
    component_deleteRangesButton(),
    '</form>'
  ].join('')

  return buffer
}


























