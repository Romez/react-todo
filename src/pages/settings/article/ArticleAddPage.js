import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ArticleAddForm from './ArticleAddFrom';

class ArticleAddPage extends React.Component {
    static path ='/settings/article/add';

    render() {
        const {rubrics} = this.props.rubrics;

        return (
            <section id="settingsAddPage">
                <h2 className="title">
                    Добавить статью
                </h2>

                <ArticleAddForm
                    rubrics={rubrics}
                />
            </section>
        );
    }
}

ArticleAddPage.propTypes = {
    rubrics: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        settings: state.settings,
        rubrics: state.rubrics
    };
}

export default connect(mapStateToProps)(ArticleAddPage);

