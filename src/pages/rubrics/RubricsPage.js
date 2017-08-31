import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class RubricsPage extends React.Component {
    static path = '/rubrics';

    render() {
        const {rubrics} = this.props.rubrics;
        return (
            <div id="RubricsPage">
                <h1 className="title">Рубрики</h1>
                <ul>
                    {rubrics.map((item, i) => (
                        <li key={i}>
                            <Link to={`${RubricsPage.path}/${item.slug}`}>
                                {item.name}
                            </Link>
                        </li>

                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        rubrics: state.rubrics
    };
}

export default connect(mapStateToProps)(RubricsPage);
