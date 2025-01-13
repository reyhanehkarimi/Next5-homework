import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
        <h1>Welcome to Admin Dashboard!</h1>
        <nav>
            <ul>
                <li><Link href="/admin/users"></Link></li>
                <li><Link href="/admin/recipes"></Link></li>
                <li><Link href="/admin/posts"></Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default page