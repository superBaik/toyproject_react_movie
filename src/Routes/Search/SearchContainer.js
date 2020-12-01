
import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";



export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    loading: false,
    error: null
  };

  // componentDidMount(){
  //   this.handleSubmit();
  // }
  handleSubmit = event=>{
    event.preventDefault();
    const{searchTerm} = this.state;
    
    if(searchTerm !==""){
      this.searchByTerm();
    }
  }
  updateTerm = event => {
    const {
      target: { value }
    } = event;
    // console.log(event.target)
    this.setState({
      searchTerm: value
    });
    // this.setState(()=>{//위 코드와 같은 표현 
    //   return {searchTerm: event.target.value};
    // })
  };

  searchByTerm = async ()=>{
    const{searchTerm} = this.state;
    this.setState({loading:true});
    try {
      const {
        data: {results: movieResults}
      } = await moviesApi.search(searchTerm);
      const {
        data: {results: tvResults}
      } = await tvApi.search(searchTerm);

      this.setState({
        movieResults,
        tvResults
      })
      // console.log(movieResults,tvResults)
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    console.log(this.state)
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
