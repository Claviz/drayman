const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Drayman',
  tagline: 'Server-side component framework',
  url: 'https://claviz.github.io',
  trailingSlash: false,
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'claviz', // Usually your GitHub org/user name.
  projectName: 'drayman', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    algolia: {
      apiKey: 'a099d0d352957a4569617f8b1c0e64ed',
      indexName: 'drayman',
    },
    image: 'drayman/img/drayman.png',
    navbar: {
      // title: 'Drayman',
      logo: {
        alt: 'Site Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
        src: 'img/logo_light.svg',
        target: '_self',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction/getting-started',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/claviz/drayman',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/docs/introduction/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            {
              label: 'Discord',
              href: 'https://discord.gg/5GYZTvUSxV',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/draymanio',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/draymanio',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/claviz/drayman',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Claviz.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    googleAnalytics: {
      trackingID: 'UA-204913605-1',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarCollapsible: false,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/Claviz/drayman/blob/main/docs/'
        },
        blog: false,
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/Claviz/drayman/blob/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
