import React from 'react'

export default function Footer() {
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </footer>
    )
}
