import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /(\.(.*)$)|_next\/image|api/

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next()
  const { basePath } = request.nextUrl

  const weekFromNow = new Date()
  weekFromNow.setDate(weekFromNow.getDate() + 7)

  const cookieCountry = request.cookies.get('country')?.value
  const countryMatch = cookieCountry || 'NL'

  if (!cookieCountry) {
    response.cookies.set('country', countryMatch.toUpperCase(), {
      expires: weekFromNow,
      path: '/',
    })
  }

  if (PUBLIC_FILE.test(request?.nextUrl?.pathname)) {
    return response
  }

  const url = new URL(`${basePath}/${countryMatch}`, request.nextUrl.origin).toString()
  console.log('url', url)
  return NextResponse.rewrite(url)
}
