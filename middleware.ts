import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

// const path = request.nextUrl.pathname
  
// // Define paths that require wallet connection
// const isProtectedPath = path.startsWith('/dapp') || 
//                        path.startsWith('/swap') || 
//                        path.startsWith('/stake')

// // Check if user has connected their wallet before
// // We'll store this in a cookie when they connect
// const isWalletConnected = request.cookies.get('walletConnected')?.value
// // See "Matching Paths" below to learn more
// if (isProtectedPath && !isWalletConnected) {
//     return NextResponse.redirect(new URL('/connect-wallet', request.nextUrl))
//   }

// export const config = {
//   matcher: '/about/:path*',
// }