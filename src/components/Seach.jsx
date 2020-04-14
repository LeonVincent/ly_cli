import React, { PureComponent } from 'react'
import './Search.less'
import styles from './Search.module.less'
import img1 from './../image/1.jpg'
import img2 from './../image/2.gif'
import Count from './Count.jsx'
export default class Search extends PureComponent {
  constructor() {
    super()
  }
  render() {
    return (
      // <div className={'search'}>
      <div className={styles.search}>
        {'Search Text'}
        <div>
          <img className="mei" src={img1} alt=""/>
          <img src={img2} alt=""/>
        </div>
        <Count />
      </div>
    )
  }
}