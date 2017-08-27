import React from 'react';
import PropTypes from 'prop-types';

class ArticlePage extends React.Component {
    static path = '/article';

    componentWillMount() {
        const {id} = this.props.match.params;
    }


    render() {
        return (
            <div>
                Article
            </div>
        );
    }
}

ArticlePage.propTypes = {

};

export default ArticlePage;
