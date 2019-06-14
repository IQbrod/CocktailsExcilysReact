import React, {Component} from 'react';
export class Header extends Component {

    render() {
      return (
        <header className="container d-flex flex-column flex-md-row justify-content-between">
            <a className="py-2 d-none d-md-inline-block" href="/">Tour</a>
            <a className="py-2 d-none d-md-inline-block" href="/">Product</a>
            <a className="py-2 d-none d-md-inline-block" href="/">Features</a>
        </header>
      );
    }
}