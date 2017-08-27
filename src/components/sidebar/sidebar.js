import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {RubricsPage, SidebarRubrics} from '../../pages/rubrics';
import {connect} from 'react-redux';

import './styles.less';

class Sidebar extends React.Component {
    render() {
        return (
            <div>
                {<Link className="rubricsTitle" to={RubricsPage.path}>Рубрики</Link> }
                <SidebarRubrics/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sidebar: state.sidebar
    };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
