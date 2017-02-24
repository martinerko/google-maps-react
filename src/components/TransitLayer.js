import React, { PropTypes as T } from 'react'

const wrappedPromise = function() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
}

export class TransitLayer extends React.Component {

  componentDidMount() {
    this.transitLayerPromise = wrappedPromise();
    this.renderTransitLayer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
        if (this.transitLayer) {
          this.transitLayer.setMap(null);
        }
        this.renderTransitLayer();
    }
  }

  componentWillUnmount() {
    if (this.transitLayer) {
      this.transitLayer.setMap(null);
    }
  }

  renderTransitLayer() {
    if (!this.props.google) {
      return null;
    }

    this.transitLayer = new google.maps.TransitLayer();
    this.transitLayer.setMap(this.props.map);
    this.transitLayerPromise.resolve(this.transitLayer);
  }

  getTransitLayer() {
    return this.transitLayerPromise;
  }

  render() {
    return null;
  }
}

TransitLayer.propTypes = {
  map: T.object
}

TransitLayer.defaultProps = {
  name: 'TransitLayer'
}

export default TransitLayer
