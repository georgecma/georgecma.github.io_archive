import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={"Michael D'Angelo's personal website. New York based Stanford ICME graduate, "
    + 'co-founder and CTO of Arthena, and YC Alumni.'}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">About this site</Link></h2>
          <p>
            George Ma's personal odds and ends. A place to host my webapps and such.
            The template is from <a href='https://github.com/mldangelo/personal-site'>https://github.com/mldangelo/personal-site</a>.      
          </p>
        </div>
      </header>
      <p> Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>. </p>
    </article>
  </Main>
);

export default Index;