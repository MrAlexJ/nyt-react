import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../service/api";

class Main extends Component {
    state = {
        topic: "",
        startYear:"",
        endYear:"",
        articles:[],
        saved: []
    };

    
    //get saved articles and update this.state
    componentDidMount(){
        this.getSavedArticles()
    }

    //method getting saved articles from db
    getSavedArticles = () =>{
        API.getArticles().then((res) =>{
            this.setState({saved: res.data});
        });
    }

    //render search
    renderArticles = () =>{
        return this.state.articles.map(article => (
            <Results
                _id={article._id}
                key={article._id}
                title={article.headline.main}
                date={article.pub_date}
                url={article.web.url}
                handleSavebutton={this.handleSavebutton}
                getSavedArticles={this.getSavedArticles}
            />
        ));
    }

    renderSaved = () => {
        return this.state.saved.map(save =>(
            <Saved
                _id={save._id}
                key={save._id}
                title={save.title}
                date={save.date}
                url={save.url}
                handleDeleteButton={this.handleDeleteButton}
                getSavedArticles={this.getSavedArticles}
            />
        ));
    }

    //track user input
    handleTopicChange = (event) => {
        this.setState({topic: event.target.value});
    }

    handleStartYearChange = (event) => {
        this.setState({startYear: event.target.value});
    }

    handleEndYearChange = (event) => {
        this.setState({endYear: event.target.value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Getting NYT Articles");
        console.log("this.state.topic: ", this.state.topic);
        console.log("this.state.startYear: ", this.state.startYear);
        console.log("this.state.endYear: ", this.state.endYear);
        API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
          .then((res) => {
            this.setState({ articles: res.data.response.docs });
            console.log("this.state.articles: ", this.state.articles);
          });
      }
    
      // article button clicked, add article to db
      handleSaveButton = (id) => {
        const findArticleByID = this.state.articles.find((el) => el._id === id);
        console.log("findArticleByID: ", findArticleByID);
        const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
        API.saveArticle(newSave)
        .then(this.getSavedArticles());
      }
    
      //delete article button clicked, remove article from db
      handleDeleteButton = (id) => {
        API.deleteArticle(id)
          .then(this.getSavedArticles());
      }
    
      render() {
        return (
    
          <div className="main-container">
            <div className="container">
              {/* Jumbotron */}
              <div className="jumbotron">
                <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
                <h2 className="text-center">Search for and save articles of interest.</h2>
              </div>
              {/* Search Form and Results Section */}
              <Search
                handleTopicChange={this.handleTopicChange}
                handleStartYearChange={this.handleStartYearChange}
                handleEndYearChange={this.handleEndYearChange}
                handleFormSubmit={this.handleFormSubmit}
                renderArticles={this.renderArticles}
              />
              {/* Saved Articles Section */}
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="panel panel-primary">
                      <div className="panel-heading">
                        <h3 className="panel-title">
                          <strong>
                            <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                        </h3>
                      </div>
                      <div className="panel-body">
                        <ul className="list-group">
                          {this.renderSaved()}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
    
        );
    }
    
}
    
export default Main;
