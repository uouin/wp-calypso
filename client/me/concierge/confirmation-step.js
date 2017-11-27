/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import Button from 'client/components/button';
import Card from 'client/components/card';
import FormattedHeader from 'client/components/formatted-header';

class ConfirmationStep extends Component {
	render() {
		// TODO: Send Button back to site's dashboard
		return (
			<Card>
				<FormattedHeader
					headerText="Your Concierge session is booked!"
					subHeaderText="We will send you an email with information on how to get prepared"
				/>
				<Button href="/">Back to your dashboard</Button>
			</Card>
		);
	}
}

export default ConfirmationStep;
