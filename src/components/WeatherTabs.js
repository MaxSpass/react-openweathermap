import React, {Component} from 'react';
import {connect} from 'react-redux'
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Bar, Line} from 'react-chartjs-2';
import {clone} from "ramda";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        marginTop: 50,
    },
});



class WeatherTabs extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
        };

        this.defaultData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [],
                },
            ],
        };

        this.barOptions = {
            options: {
                tooltips: {
                    mode: 'index',
                    axis: 'x'
                },
                title: {
                    display: true,
                    text: '',
                    fontColor: '#000000',
                    fontSize: 24,
                    fontStyle: 'normal',
                    lineHeight: 1,
                    fontFamily: 'Roboto'
                },
                legend: {
                    display: false,
                },
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        autoSkip: true,
                        maxRotation: 0,
                        minRotation: 0,
                        fontSize: 14,
                        fontColor: '#000000',
                        fontStyle: 'normal',
                        lineHeight: 1,
                        fontFamily: 'Roboto'
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        fontSize: 14,
                        fontColor: '#000000',
                        fontStyle: 'normal',
                        lineHeight: 1,
                        fontFamily: 'Roboto'
                    }
                }]
            },
        }

    }

    clipBySegment(data) {
        return data.filter((item, i) => i % 6 === 0);
    }

    transformDataForChart(date, data) {
        const object = clone(this.defaultData);

        object.labels = date;
        object.datasets[0].data = data;
        return object;
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        const { classes, renderChart } = this.props;
        const {options, scales} = this.barOptions;

        let wind, temp, date, pressure, humidity;

        if (renderChart.length) {
            wind = this.clipBySegment(renderChart.map(res => res.wind.speed));
            temp = this.clipBySegment(renderChart.map(res => res.main.temp));
            date = this.clipBySegment(renderChart.map(res => res.dt_txt));
            pressure = this.clipBySegment(renderChart.map(res => res.main.pressure));
            humidity = this.clipBySegment(renderChart.map(res => res.main.humidity));
        }

        const forWind = this.transformDataForChart(date, wind);
        const forTemperature = this.transformDataForChart(date, temp);
        const forPressure = this.transformDataForChart(date, pressure);
        const forHumidity = this.transformDataForChart(date, humidity);


        return (!!renderChart.length &&
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Wind" />
                        <Tab label="Temperature" />
                        <Tab label="Pressure" />
                        <Tab label="Humidity" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><Bar label={date} data={forWind} options={options} scales={scales}/></TabContainer>}
                {value === 1 && <TabContainer><Line label={date} data={forTemperature} options={options} scales={scales}/></TabContainer>}
                {value === 2 && <TabContainer><Bar label={date} data={forPressure} options={options} scales={scales}/></TabContainer>}
                {value === 3 && <TabContainer><Line label={date} data={forHumidity} options={options} scales={scales}/></TabContainer>}
            </div>
        );
    }
}

WeatherTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(
        state => ({
            renderChart: state.renderChart
        })
    ),
)(WeatherTabs);