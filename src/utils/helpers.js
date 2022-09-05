export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function openWhatsApp(number) {
  const formattedNumber = number.replace('+', '').replaceAll(' ', '');
  return window.open(`https://wa.me/${formattedNumber}`, '_blank')
}

export function formatNumber(phone) {
  if (phone.includes('+')) {
    return phone;
  } else {
    return `+ ${phone}`
  }

}
