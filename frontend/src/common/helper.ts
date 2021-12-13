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

