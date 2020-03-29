import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default class spinner extends Component {
  render() {
  return (
      <div>
        <Spinner radius={120} color={"#fff"} stroke={2} visible={true} />
      </div>
    );
  }
}