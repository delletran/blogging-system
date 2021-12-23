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

export const string_to_slug = (str) => {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}