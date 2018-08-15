import React, {PureComponent} from 'react';

export default class DateComponent extends PureComponent {
    constructor() {
        super();

        const today = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let date = `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]}`;

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <div className='date'>
                <b>{this.state.date}</b>
            </div>
        );
    }
}