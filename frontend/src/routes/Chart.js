import React, {Component} from 'react';
import {connect} from 'react-redux'
import {authConstants, vacationsConstants} from "../_constants";
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel} from 'victory';
import {withRouter} from 'react-router-dom'

class Chart extends Component {
    componentDidMount() {
        const {isLoggedIn, history} = this.props;

        if (!isLoggedIn) {
            history.push(`/`)
        }
    }

    _getData = () => {
        const {vacationsArray} = this.props;

        let maxFollowers = 0;

        const chartData = vacationsArray
            .filter(vacation => vacation.followers)
            .map(vacation => {
                if (vacation.followers > maxFollowers) maxFollowers = vacation.followers;
                return {
                    id: vacation._id,
                    followers: vacation.followers
                }
            });

        let followersTickValues = [...Array(maxFollowers)].map((x, i) => i);
        followersTickValues.push(maxFollowers);

        return {
            chartData: chartData,
            followersTickValues: followersTickValues
        }

    };

    render() {
        const {isLoggedIn} = this.props;

        const data = isLoggedIn && this._getData();

        return (
            <div className={'chart'}>
                {
                    isLoggedIn &&
                    <VictoryChart
                        domainPadding={20}
                        theme={VictoryTheme.material}
                    >
                        <VictoryAxis
                            // tickValues specifies both the number of ticks and where
                            // they are placed on the axis

                            tickFormat={(x) => (x.slice(0, 8))}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickValues={data.followersTickValues}
                            // // tickFormat specifies how ticks should be displayed
                        />
                        <VictoryBar
                            data={data.chartData}
                            x="id"
                            y="followers"
                        />
                    </VictoryChart>
                }

            </div>
        )
    }
}

function mapStateToProps({vacations, auth}) {
    return {
        vacationsArray: vacations[vacationsConstants.VACATIONS],
        isLoggedIn: auth[authConstants.USER_AUTHENTICATED]
    }
}

const connectedPage = withRouter(connect(mapStateToProps)(Chart));
export {connectedPage as Chart};
