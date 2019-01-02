
import React, { Component } from 'react';

import Slider from './Slider';

export default class Ipromise extends Component {
    render() {
        return (
            <div>
                ...test...
                <br/>
                <Slider
                    width={160} time={4000} state="res"
                />
                <br/>
                <Slider
                    width={160} time={10000} state="res"
                />
                <br/>
                <Slider
                    width={160} time={2000} state="rej"
                />
            </div>
        );
    }
}