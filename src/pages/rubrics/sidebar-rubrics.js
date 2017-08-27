import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getRubricsList, getRubric, getRubricArticles} from './actions';
import RubricsPage from './rubrics';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import './styles.less';

class SidebarRubrics extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(getRubricsList(this.props.history));
    }

    getRubric(e) {
        this.props.dispatch(getRubric(e.target.dataset.slug));
        this.props.dispatch(getRubricArticles(e.target.dataset.slug));
    }

    renderSidebarItem(item, i) {
        const linkClasses = classNames('item', {
            'active': this.props.location.pathname === `${RubricsPage.path}/${item.slug}`
        });
        return (
            <div className={linkClasses} key={i}>
                {<Link
                    to={`${RubricsPage.path}/${item.slug}`}
                    onClick={this.getRubric.bind(this)}
                    data-slug={item.slug}
                >{item.name}</Link>}
            </div>
        );
    }

    render() {
        const {rubrics} = this.props.rubrics;
        return (
            <div className="sidebarRubrics">
                {rubrics.map(this.renderSidebarItem.bind(this))}
            </div>
        );
    }
}

SidebarRubrics.propTypes = {
    rubrics: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics
    };
}

export default withRouter(connect(mapStateToProps)(SidebarRubrics));
