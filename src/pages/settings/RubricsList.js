import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import {bindAll} from 'lodash';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import {deleteRubric, getRubricsList} from '../rubrics/actions';
import {addFlashMessage} from '../../components/flash/actions';
import {EditRubricPage, RubricsPage} from '../rubrics';

class RubricsList extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, 'renderRow', 'delRubric');
    }

    delRubric(e) {
        e.preventDefault();
        const {slug} = e.target.dataset;
        if (slug) {
            this.props.dispatch(deleteRubric(slug)).then(() => {
                this.props.dispatch(getRubricsList(this.props.history));
                this.props.dispatch(addFlashMessage({type: 'success', text: 'Рубрика удалена'}));
            });
        }
    }

    renderRow(item, i) {
        return (
            <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                    <Link to={`${RubricsPage.path}/${item.slug}`}>
                        <FontAwesome name="eye"/>
                    </Link>
                    <Link to={`${EditRubricPage.path}/${item.slug}`}>
                        <FontAwesome name="pencil"/>
                    </Link>
                    <Link  to={`delete/${item.id}`}>
                        <FontAwesome data-slug={item.slug} onClick={this.delRubric} name="trash"/>
                    </Link>
                </td>
            </tr>
        );
    }

    render() {
        const {rubrics} = this.props.rubrics;

        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>slug</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {rubrics.map(this.renderRow)}
                </tbody>
            </Table>
        );
    }
}

RubricsList.propTypes = {
    rubrics: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired

};

export default RubricsList;
