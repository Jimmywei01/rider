export function setPage (total, currentPage, pageSize) {
  const tableData = total.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return tableData
}
