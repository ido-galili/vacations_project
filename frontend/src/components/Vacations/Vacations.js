import {vacationsActions} from "_actions";

import React, {Component} from 'react';
import {connect} from "react-redux";
import {vacationsConstants} from "_constants";

import {VacationCard} from "./VacationCard";

class Vacations extends Component {

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(vacationsActions.getVacations())
    }

    render() {
        const {vacationsArray} = this.props;
        console.log(vacationsArray);
        //
        return (
            <div className="vacations">
                    {
                        vacationsArray && vacationsArray.map(vacation => {
                            return (
                                <VacationCard
                                    vacation={vacation}
                                    key={`vacation-card-${vacation._id}`}/>
                            )
                        })
                    }
            </div>

        )
    }
}

function mapStateToProps({vacations}) {
    return {
        vacationsArray: vacations[vacationsConstants.VACATIONS],
    }
}

const connectedPage = connect(mapStateToProps)(Vacations);
export {connectedPage as Vacations};
