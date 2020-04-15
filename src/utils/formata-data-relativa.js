import formatDistance from 'date-fns/formatDistance'
import isToday from 'date-fns/isToday'
import pt from 'date-fns/locale/pt-BR'
import isDate from 'date-fns/isDate'
import parse from 'date-fns/parse'
import parseISO from 'date-fns/parseISO'

export default function formatDateRelative(
  fromDate,
  toDate = new Date(),
  inputPattern
) {
  if (!isDate(fromDate)) {
    if (inputPattern) {
      fromDate = parse(fromDate, inputPattern, new Date())
    } else {
      fromDate = parseISO(fromDate)
    }
  }

  return (
    formatDistance(fromDate, toDate, { locale: pt }) +
    (isToday(toDate) ? ' atrás' : '')
  )
}
