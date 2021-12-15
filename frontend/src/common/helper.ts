import sanitizeHtml from 'sanitize-html';


export const formatHtml = (html: string | undefined): string => {
  const clean: string = sanitizeHtml(html || '', {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'div', 'p', 'img'],
    // allowedAttributes: {
    //   a: ['href', 'target'],
    // },
  })
  return clean
}


export const strToTitle = (str: string | undefined): string => {
  const titled: string = str !== undefined ? (str.charAt(0).toUpperCase() + str.slice(1)) : ''
  return titled
}

