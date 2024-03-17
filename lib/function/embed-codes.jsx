const getTiktokSrc = (embedCode) => {
  const splitEmbedCode = embedCode.split('"')
  return {
    scriptCode: splitEmbedCode[1],
    divCode: splitEmbedCode[3]
  }
}

const splitWuffooForm = (embedCode) => {
  const splitEmbedCode = embedCode.split('<script type="text/javascript">')
  const splitScriptCode = splitEmbedCode[1].split('</script>')

  return {
    divElement: splitEmbedCode[0],
    scriptCode: splitScriptCode[0]
  }
}

export {
  getTiktokSrc,
  splitWuffooForm
}