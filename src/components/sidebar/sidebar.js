import React from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getRubricsList} from './actions';
import {RubricsPage} from '../../pages/rubrics';
import './styles.less';

class Sidebar extends React.Component {
    componentWillMount() {
        this.props.dispatch(getRubricsList());
    }

    renderRubrics(item, i) {
        return (
            <div key={i} className="item">
                {<Link to={`${RubricsPage.path}/${item.slug}`}>{item.name}</Link>}
            </div>
        );
    }

    render() {
        const {rubrics} = this.props.sidebar;

        return (
            <div>
                <section id="rubricsSidebar">
                    {<Link className="rubricsTitle" to={RubricsPage.path}>Рубрики</Link> }
                    {rubrics.map(this.renderRubrics.bind(this))}
                </section>
            </div>
        );
    }
}

Sidebar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        sidebar: state.sidebar
    };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
