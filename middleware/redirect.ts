import redirects from '../data/redirects.json'

export default function ({ route, redirect }: any) {
  // find the redirect if it exists and redirects
  const base = redirects.find(r => route.fullPath.includes(r.from))
  const to = route.fullPath.split('/')[2]

  if (base) {
    return redirect(base.to + '/' + to)
  }
}
