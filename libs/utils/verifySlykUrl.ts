import fetch from 'node-fetch'

const parseTitle = (body) => {
  const match = body.match(/<title>([^<]*)<\/title>/)
  if (!match || typeof match[1] !== 'string') throw new Error('Unable to parse the title tag')
  return match[1]
}

export const verifySlykUrl = async (slyk: string) => {
  try {
    const res = await fetch(`https://${slyk}`, {
      method: 'GET',
    })
    if (res.status === 200) {
      const title = parseTitle(await res.text())
      if (title.includes('Slyk Not Found') || title.includes('Early Access | Slyk')) {
        return false
      }
    }
    return true
  } catch (_) {
    return true
  }
}
