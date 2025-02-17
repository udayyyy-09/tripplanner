import React from 'react'
import { Button } from '@/components/ui/button';
// import { Link } from 'react-BrowserRouter';
import { Link } from 'react-router-dom';
function Header() {
  // const navigate = useNaviagte();
  return (
    <div className = 'p-3 shadow-sm flex justify-between items-center px-5' >
      <Link to ="/" >
        <img src="/logo.svg" alt="logo"  className = "w-16 h-auto object-contain"/>
      </Link>
      <Button>Sign In</Button>
    </div>
  )
}
export default Header
