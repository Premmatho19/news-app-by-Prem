import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, 
        })

    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }

    fetchMoreData = async () => {  
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };

  render() {
    // console.log("render");
    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>Hot News - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
        <div className="container">
        
        <div className="row">
        {/* !this.state.loading &&  */}
          {this.state.articles.map((element) => {

            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

            </div>
          })}
          </div>
        </div>
        </InfiniteScroll>
       
        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-warning" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}

      </>
    )
  }
}

export default News






// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";





// export class News extends Component {

//   static defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
//   }

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   }

//   capitalizeFirstLetter =  (string) =>{
//     return string.charAt(0).toUpperCase() + string.slice(1)
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       totalResults : 0
//     }
//     document.title = `${this.capitalizeFirstLetter(this.props.category)} - Hot News`;
//   }

//   async updateNews() {

//     this.props.setProgress(0)
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//     this.props.setProgress(40)
//     let data = await fetch(url);
//     this.props.setProgress(60)
//     let parsedData = await data.json()
//     this.props.setProgress(100)
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false
//     })
//     this.props.setProgress(100)
//   }

//   async componentDidMount() {
//     // console.log("SVG")
//     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=1&pageSize=${this.props.pageSize}`;
//     // this.setState({ loading: true })
//     // let data = await fetch(url)
//     // let parseData = await data.json();
//     // // console.log(parseData);
//     // this.setState({
//     //   articles: parseData.articles,
//     //   totalResults: parseData.totalResults,
//     //   loading: false
//     // });
//     this.updateNews();
//   }

//   handlePrevClick = async () => {
//     // console.log("Previous");

//     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0a41a249011485abd93b4ff245c1f49&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
//     // this.setState({loading : true})
//     // let data = await fetch(url)
//     // let parseData = await data.json();
//     // // console.log(parseData);

//     // this.setState({
//     //   page : this.state.page - 1,
//     //   articles : parseData.articles,
//     //   loading : false
//     // })
//     this.setState({ page: this.state.page - 1 });
//     this.updateNews();
//   }

//   handleNextClick = async () => {

//     // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

//     // }else{
//     //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0a41a249011485abd93b4ff245c1f49&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
//     //   this.setState({loading : true})
//     //   let data = await fetch(url)
//     //   let parseData = await data.json();

//     //   this.setState({
//     //     page : this.state.page + 1,
//     //     articles : parseData.articles,
//     //     loading : false
//     //   })
//     // }
//     this.setState({ page: this.state.page + 1 });
//     this.updateNews();
//   }

//   fetchMoreData = async () => {
//    this.setState({page : this.state.page + 1})
//    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//    this.setState({ loading: true });
//    let data = await fetch(url);
//    let parsedData = await data.json()
//    this.setState({ 
//      articles: this.state.articles.concat(parsedData.articles),
//      totalResults: parsedData.totalResults,
//      loading: false
//    })
//   };


//   render() {
//     // console.log("render");
//     return (
//       <>
//         <h1 className='text-center' style={{ margin: '35px 0px' }}>Hot News - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
        // {/* {this.state.loading && <Spinner />} */}

//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.state.totalResults}
//           loader={this.state.loading && <Spinner />}
//         >
//         <div className="container">
        
//         <div className="row">
//         {/* !this.state.loading &&  */}
//           {this.state.articles.map((element) => {

//             return <div className="col-md-4" key={element.url} >
//               <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

//             </div>
//           })}
//           </div>
//         </div>
//         </InfiniteScroll>
       
//         {/* <div className="container d-flex justify-content-between">
//             <button disabled={this.state.page <= 1} type="button" className="btn btn-warning" onClick={this.handlePrevClick}>&larr; Previous</button>
//             <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNextClick}>Next &rarr;</button>
//           </div> */}

//       </>
//     )
//   }
// }

// export default News
