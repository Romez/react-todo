import React from 'react';
import {Col, Panel, Image} from 'react-bootstrap';

import './styles.less';

export default class ContactsPage extends React.Component {
    static path = '/contacts';

    render() {
        return (
            <section id="ContactsPage">
                <Panel>
                    <Col xs={12} sm={6}>
                        <Image src="/img/code.jpg" rounded/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <p>Email: roman.ushakov.89@inbox.ru</p>
                        <p>Телефон: +7 911 812 78 31</p>
                        <p>vk: <a target="_blank" href="https://vk.com/roman678">Ушаков Роман</a></p>
                    </Col>
                </Panel>
            </section>
        );
    }
}
