
import React from 'react';
import { Link } from 'react-router-dom';

//import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>George Ma</h2>
        <p><a href="mailto:georgema689@gmail.com">email me</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>Hello there.</h2>
      <p>
        I am George. 
        I'm currently a devops engineer for a HFT in New York.
        Because there's a bunch of restrictions and I'm afraid to get sued, I won't tell you which one. But it's a small one, and they're pretty poor.
      </p>
    </section>
  </section>
);

export default SideBar;