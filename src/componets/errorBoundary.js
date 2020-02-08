import { Component } from '@wordpress/element';

export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      console.log(error);
      // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // También puedes registrar el error en un servicio de reporte de errores
      console.log(error);
      console.log( errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        {console.log(this.props.children)}
        // Puedes renderizar cualquier interfaz de repuesto
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }