
import React, { Component } from 'react';

import './Slider.scss';

const delay = 50;

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p: 0,
            f: null, // final state 'res' || 'rej'
        }
    }

    componentDidMount() {

        const {
            time = 1000,
            state = 'res',
            callback = () => {},
            del = delay,
        } = this.props;

        if (state !== 'res' && state !== 'rej') {

            throw `state have to be 'res' or 'rej'`;
        }

        if (time < 0) {

            throw `time have to be bigger than 0`;
        }

        if (time < del) {

            throw `time have to be bigger than delay: ` + del;
        }

        if (typeof callback !== 'function') {

            throw `callback have to be a function`;
        }

        setTimeout(() => {
            this.setState({
                p: 100,
                td: (time - del) + 'ms' // transition-duration
            });
        }, del);

        setTimeout(() => {
            this.setState({
                f: state,
            }, () => callback(state));
        }, time);
    }
    render() {

        const {
            width = 60,
        } = this.props;

        const {
            p,
            f,
            td,
        } = this.state;

        return (
            <div
                className={"slider" + (f ? " " + f : '')}
                style={{
                    width: width + 'px',
                }}
            >
                <div
                    style={{
                        width: p + '%',
                        transitionDuration: td
                    }}
                />
            </div>
        );
    }
}