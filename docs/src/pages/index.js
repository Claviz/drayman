import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import DraymanLogoLightTheme from '../../static/img/logo_light.svg';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <DraymanLogoLightTheme style={{ maxWidth: 600 }} />
        <p className="hero__subtitle" style={{ color: 'black' }}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction/getting-started">
            Drayman Introduction - 5min ⏱️
          </Link>
        </div>
        <div className={styles.sandbox}>
          <iframe style={{
            width: "100%",
            height: 900,
            outline: "1px solid #252525",
            border: 0,
            borderRadius: 8,
            marginBottom: 16,
            zIndex: 100,
            width: '100%',
            height: '500px'
          }} src="https://codesandbox.io/p/sandbox/drayman-framework-v943ig?file=/src/components/home.tsx&embed=1" allowfullscreen></iframe>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Server-side component framework">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
