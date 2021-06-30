const namedRanges = SpreadsheetApp.getActiveSpreadsheet().getNamedRanges()

function retrieveAndFormatNamedRanges() {
  let rangeInfo = {}
  for (let i = 0; i < namedRanges.length; i++) {
    let range = namedRanges[i]

    rangeInfo[range.getName()] = {
      remove: range.remove,
      rename: range.setName,
      reloacate: range.setRange,
    }
  }
  
  return rangeInfo
}


function showDeletionConfirmationDialog(rangeList) {
  /*get confirmation to delete ranges here*/
  const performDeletion = deletionWarning()
  if (!performDeletion) return false;

  // do stuff...
  for (let i = 0; i < rangeList.length; i++) {
    let selectedRange = rangeList[i]
    namedRanges.forEach((r) => {
      if (r.getName() === selectedRange) r.remove()
    })
  }
  
  /*show toast (success or warn) here*/
  deletionConfirmation()
}
