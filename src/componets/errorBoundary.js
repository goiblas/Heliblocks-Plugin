import { Component } from '@wordpress/element';
import { i18n } from "./../utils"
export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // console.log(error);
      // console.log(errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>{i18n("Something went wrong")}</h1>;
      }
  
      return this.props.children; 
    }
  }