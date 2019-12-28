﻿import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class Vkus extends Component {
    displayName = Vkus.name

    constructor(props) {
        super(props);
        this.state = { vkuses: [], loading: true };

        fetch('api/Vkus/GetVkuses', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + sessionStorage.getItem('Token')
                },
            }
        )
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                this.setState({ vkuses: data, loading: false });
            });
    }

    static renderForecastsTable(vkuses) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                    <th>№</th>
                        <th>Наименование</th>
                                           </tr>
                </thead>
                <tbody>
                    {vkuses.map(vkus =>
                        <tr key={vkus.id}>
                            <td>{vkus.id}</td>
                            <td>{vkus.nazv}</td>
                            <td>
                                <div className="linkD">
                                    <Link to={`/vkus/edit/${vkus.id}`}>
                                        <div className="linkEdit">
                                            Редактировать
                                        </div>
                                    </Link>
                                    <button className="buttonDelete" onClick={(e) => this.delete(vkus.id, e)}>
                                        Удалить
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    static delete(id, e) {
        e.preventDefault();
        fetch('api/Vkus/DeleteVkus', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
            body: JSON.stringify({ "id": id }),
        }).then(response => {
            console.log(response);
        });
        return window.location.href = "/vkus";
    }
    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : Vkus.renderForecastsTable(this.state.vkuses);

            return (
                <div className="catalog2">
                    <text className="info">Акции</text>
                    <text className="info">|</text>
                    <text className="info">Доставка и оплата</text>
                    <text className="info">|</text>
                    <text className="info">Магазины</text>
                    <text className="info">|</text>
                    <text className="info">Поддержка</text>
                    <div className="tabl">
                        <div className="fontAll __indexFormMargin">
                            <div className="fontHeading">
                                <h1>Вкусы</h1>
                            </div>
                            <div>
                                <div className="linkWidth">
                                    <Link to="/vkus/add">
                                        <div className="linkAdd">
                                            Добавить
                                        </div>
                                    </Link>
                                </div>
                                <div className="content">
                                    {contents}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
