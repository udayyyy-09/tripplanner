import React from 'react'
import { Button } from '@/components/ui/button';
function Header() {
  return (
    <div className = 'p-3 shadow-sm flex justify-between items-center px-5' >
      <img src="/logo.svg" alt="logo"  className = "w-16 h-auto object-contain"/>
      <Button>Sign In</Button>
    </div>
  )
}
export default Header
