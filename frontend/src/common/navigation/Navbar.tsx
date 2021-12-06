import React from 'react'

interface NavbarProps {
  children: JSX.Element
}

const Navbar = (props: NavbarProps) => {
  console.log(props.children)
  return <div></div>
}

export default Navbar
