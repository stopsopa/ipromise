
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
    Tab
} from 'semantic-ui-react';

// import Tab ResourceVisible from './Tab Resource/Tab ResourceVisible';
//
// import Tab ResourceFormVisible from './Tab Resource/Tab ResourceFormVisible';

/**
 * Example usage vvv
 */

/*
<TabExtended>
    {{
        resource: {
            menuItem: 'Resource',
            render: (context, activateTabByName) => (
                <Tab.Pane>
                    <TabResourceVisible
                        activateTabByName={activateTabByName}
                    />
                </Tab.Pane>
            )
        },
        'resource-edit': {
            menuItem: 'Add resource',
            render: (context, activateTabByName) => (


            ... you can render wrapper Tab.Pane inside TabResourceFormVisible component - up to you

            ... or like above


                    <TabResourceFormVisible
                        activateTabByName={activateTabByName}
                    />
            )
        },
        'images-edit': {
            menuItem: 'Images',
            render: () => <Tab.Pane>
                <h4>Not implemented yet...</h4>


                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo fermentum luctus. Nunc scelerisque et mi ac blandit. Duis id nisi et ipsum sodales malesuada. In eleifend sagittis odio non finibus. Praesent euismod semper turpis. Aenean congue maximus mi vitae sagittis. Proin bibendum nibh nec lacus viverra, eget rhoncus nisi egestas. Aenean interdum ipsum sit amet libero fermentum tincidunt. Donec dolor ligula, viverra quis nisi ut, finibus lobortis lorem. Duis lobortis, tellus quis euismod lobortis, lacus mauris interdum orci, vitae laoreet nisl sem vel metus. Pellentesque ac turpis quis diam condimentum dapibus. Curabitur nibh magna, consectetur vel cursus vel, varius gravida nisi. In porta, mauris id posuere porta, lectus ante ultricies mi, non pretium massa nisi ut elit.</p>

                <p>In at aliquam ipsum, ut blandit quam. In id venenatis odio. In accumsan congue elit, sit amet ornare eros dignissim vel. Morbi facilisis bibendum iaculis. Integer a pellentesque arcu. Maecenas ut nibh eget eros hendrerit feugiat. Nulla nec ornare lectus. Integer fermentum vehicula dolor ac convallis. Nunc vel dui gravida, hendrerit est id, suscipit urna. Aliquam rhoncus odio sed arcu dignissim, at finibus diam pulvinar. Mauris vestibulum ligula vel neque semper hendrerit nec quis neque. Nulla nulla dolor, facilisis at turpis sit amet, egestas vehicula ex. Aliquam malesuada aliquam cursus.</p>

                <p>Mauris vitae malesuada arcu. Suspendisse augue magna, mollis quis ipsum non, tincidunt bibendum sem. Nullam ornare, libero id tristique auctor, risus lacus lacinia tellus, a venenatis lorem sem quis sem. Donec condimentum tincidunt interdum. Mauris tellus nisi, condimentum vitae ligula at, aliquam rutrum tellus. Nunc dignissim sit amet enim at placerat. Proin nec felis mollis, blandit urna ac, imperdiet velit.</p>

                <p>Ut eu sodales massa. Mauris sollicitudin nunc at euismod luctus. Nam libero tortor, vestibulum in ante id, fermentum ornare enim. Suspendisse non neque turpis. Nulla facilisi. Suspendisse erat mi, pharetra eu venenatis condimentum, laoreet ac arcu. Nullam finibus pulvinar leo, ac varius mauris tincidunt et. Vivamus tincidunt auctor sapien, vitae gravida nunc ullamcorper ac. Nunc pharetra, justo non laoreet condimentum, nunc nisi tincidunt est, quis scelerisque nulla ante et nibh. Suspendisse eu odio tincidunt, volutpat eros non, eleifend nibh. Suspendisse metus orci, tempor tincidunt vulputate a, euismod ac lacus. In dui nisi, auctor vitae tristique vel, congue eget dolor. Pellentesque consequat euismod pulvinar. Donec iaculis libero id augue porta, non accumsan justo venenatis.</p>

                <p>Pellentesque ut semper neque, et porta nisl. Ut finibus ultricies enim sit amet accumsan. Donec porttitor commodo nulla ac ornare. Fusce commodo, massa eu rhoncus dignissim, ligula turpis egestas tortor, non consequat dolor ex pharetra diam. Nunc pellentesque, felis eu porttitor aliquet, risus ipsum dapibus arcu, vel sagittis lectus felis eget metus. In ut eros mauris. Donec eget viverra mi. Nam non ante dui. Aliquam pharetra lacinia quam convallis elementum. Donec vel tortor dolor. Morbi sapien velit, faucibus et nulla non, consectetur semper urna. Nullam mollis lobortis tristique. Nulla facilisi. Nunc quis erat sem. Proin facilisis a sem sit amet malesuada.</p>
            </Tab.Pane>
        }
    }}
</TabExtended>

*/

/**
 * Example usage ^^^
 *
 * From now on you can internally call function from props:
 * activateTabByName('images-edit')
 */

class TabExtended extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            activeIndex: 0
        }
    }
    static propTypes = {
        children: PropTypes.object.isRequired
    }
    findIndex = indexName => {

        const list = Object.keys(this.props.children);

        for (let i = 0, l = list.length ; i < l ; i += 1 ) {

            if (list[i] === indexName) {

                return i;
            }
        }

        throw `TabExtended::findIndex can't find index based on name '${indexName}'`;
    }
    onTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
    activateTabByName = name => this.onTabChange(null, {
        activeIndex: this.findIndex(name)
    });
    render() {

        const activateTabByName = this.activateTabByName;

        const {
            children,
            ...props
        } = this.props;

        const {
            activeIndex
        } = this.state;


        return (
            <Tab
                {...props}
                activeIndex={activeIndex}
                panes={Object.keys(children).map(name => {

                    const item = children[name];

                    item.render = ((render) => {
                        return (...args) => render(...[...args, activateTabByName])
                    })(item.render);

                    return item;
                })}
                onTabChange={this.onTabChange}
            />
        );
    }
}

export default TabExtended;