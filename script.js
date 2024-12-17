function onEdit(e) {
  console.log("偵測到檔案有被編輯");

  if (!e || !e.source) {
    console.log("事件物件 e 或 e.source 不存在！");
    return;
  }

  try {
    const sheet = e.source.getActiveSheet();

    const range = e.range;
    const editedRow = range.getRow();
    const editedColumn = range.getColumn();
    const editedValue = range.getValue();

    if (editedRow == 1) {
      console.log("編輯的是標題行，忽略");
      return;
    }

    // 尋找聯繫方式欄位
    const emailColumnName = "聯繫方式";
    const columnNames = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    const emailColumnIndex = columnNames.indexOf(emailColumnName) + 1;

    if (emailColumnIndex === 0) {
      console.log("未找到 '聯繫方式' 欄位");
      return;
    }

    // 確認編輯欄位是否為聯繫方式欄位
    if (editedColumn === emailColumnIndex) {
      handleEmailData(editedValue);
    }
  } catch (error) {
    console.log("錯誤: " + error.message);
  }
}

function handleEmailData(emailData) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(emailData)) {
    console.error("無效的 Email 格式: " + emailData);
    return;
  }

  console.log("聯繫方式欄位更新，處理新資料: " + editedValue);
  return;
}
