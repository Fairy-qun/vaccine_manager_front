import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
export function useExportTable() {
  const exportExcelList = name => {
    const wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
    const wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array'
    })
    try {
      FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${name}.xlsx`)
    } catch (e) {
      if (typeof console !== 'undefined') {
        console.log(e, wbout)
      }
    }
    return wbout
  }

  return {
    exportExcelList
  }
}
