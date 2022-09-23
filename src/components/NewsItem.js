import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">

          <h5 className="card-title">{title}<span className="position-absolute top-0 translate-middle badge   rounded-pill bg-danger" style={{ left: '90%', zindex: "1" }}>
            {source} </span>
          </h5>

          <img src={!imageUrl ? "https://timesofindia.indiatimes.com/photo/94298755/size-42440/94298755.jpg" : imageUrl} className="card-img-top" alt="cricket" />
          <div className="card-body">



            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-danger">By {!author ? 'unknown' : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
