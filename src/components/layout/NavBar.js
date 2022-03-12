import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Branding = styled.a`
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const Logo = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 0.5em;
`;

export default function NavBar() {
  const [hoverNavBar, setHoverNavBar] = useState(false)

  function updateHoverNavBar() {
    window.scrollY <= 0
      ? setHoverNavBar(false)
      : setHoverNavBar(true);
  }

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    window.addEventListener('scroll', updateHoverNavBar.bind(this), true);

    // Similar to componentDidUnmount
    return () => {
      window.removeEventListener('scroll', updateHoverNavBar.bind(this), true);
    }
  }, [])

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
      style={
        hoverNavBar
        ? {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          backgroundColor: '#ef5350 !important'
        }
        : {
          backgroundColor: 'transparent !important'
        }
      }
    >
      <Branding
        href="/"
        className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
      >
        <Logo src="./logo.svg" />
        React Pokemon Wiki
      </Branding>
    </nav>
  );
}
