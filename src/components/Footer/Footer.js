import PropTypes from 'prop-types'
import React from 'react'
import styles from './Footer.module.scss'

const Footer = ({ siteMetadata }) => (
  <footer className={styles.footer}>
    <div>
      <span>© </span>
      <a href={siteMetadata.twitterHandle} className={styles.link} target="blank">
        {siteMetadata.fullName}
      </a>
      <span> 2019. Theme by </span>
      <a href="https://twitter.com/flexdinesh" className={styles.link} target="blank">
      flexdinesh
      </a>
      <span>.</span>
    </div>
  </footer>


)

Footer.propTypes = {
  siteMetadata: PropTypes.object,
}

export default Footer
