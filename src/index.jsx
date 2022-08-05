import * as $ from 'jquery'
import Post from '@models/Post'
import './styles/styles.css'
import './styles/less.less'
import './styles/scss.scss'
import Picture from './assets/picture.jpg'
import './babel'
import { render } from 'react-dom'
import React from 'react'
import xml from './assets/data.xml'

const post = new Post('Webpack Post title', Picture )

// $('pre').addClass('code').html(post.toString())

const App = () => (
    <div className="container">
        <h1>Webpack course test</h1>
            <div className="logo" />
                    <div className="box">
                        <h2>Less</h2>
                    </div>

                    <div className="card">
                        <h2>SCSS</h2>
                    </div>
    </div>
)

render(<App />, document.getElementById('app'))

// console.log('Post to string:', post.toString())
// console.log('XML:', xml)