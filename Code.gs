function doGet(e) {
  var template = HtmlService.createTemplateFromFile('index')
  return  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
  .addMetaTag('viewport', 'width=device-width , initial-scale=1')
}

function uploadFiles(form) {
  try {
    var dropbox = DriveApp.getFolderById('10EPKIAKXVj-QUBxh5Rbh8TAQebn4mEj7')
    var sub = form.id + "_" + form.name
    var folder, folders = DriveApp.getFoldersByName(sub);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = dropbox.createFolder(sub);
    }

    var file1 = folder.createFile(form.file1);
        file1.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.COMMENT);
    var url1 = file1.getUrl()
    var file2 = folder.createFile(form.file2);
        file2.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.COMMENT);
    var url2 = file2.getUrl()
    var id = form.id
    var name = form.name
    var password = form.password
    var ss = SpreadsheetApp.openById('13dAzNGsfYy1Gqf_CSeZv9hkBOdETgJoZSajj-cY3lzs')
    var sh = ss.getSheetByName('ข้อมูล')
    sh.appendRow([new Date(), id, name, password, url1, url2])
    return id + " " + name + " อัพโหลดไฟล์เรียบร้อยแล้ว  <p><p><a target='_blank' href ='"+ url1 +"' >คลิกดูรูปถ่ายที่อัพโหลด</a><p><a target='_blank' href ='"+ url2 +"' >คลิกดูสำเนาบัตรประชาชนที่อัพโหลด</a>"
  } catch (error) {
    return error.toString();
  }
}

/* INCLUDE HTML PARTS, EG. JAVASCRIPT, CSS, OTHER HTML FILES */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();
}
