/**
 * External dependencies
 *
 * @format
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import Card from 'client/components/card';
import Checklist from 'client/components/checklist';
import Main from 'client/components/main';
import DocumentHead from 'client/components/data/document-head';
import { getSelectedSiteId } from 'client/state/ui/selectors';
import { getSiteChecklist } from 'client/state/selectors';
import QuerySiteChecklist from 'client/components/data/query-site-checklist';
import { onboardingTasks } from '../onboardingChecklist';

class ChecklistShow extends PureComponent {
	render() {
		const { siteId, siteChecklist } = this.props;
		let tasks = null;

		if ( siteChecklist && siteChecklist.tasks ) {
			tasks = onboardingTasks( siteChecklist.tasks );
		}

		return (
			<Main>
				<DocumentHead title="Site Checklist" />
				{ siteId && <QuerySiteChecklist siteId={ siteId } /> }
				<Card>
					<h1 className="checklist-show__header-heading">Welcome back!</h1>
					<h2 className="checklist-show__header-text">
						Let's get your site ready for its debut with a few quick setup steps
					</h2>
					<Checklist isLoading={ ! tasks } tasks={ tasks } />
				</Card>
			</Main>
		);
	}
}

const mapStateToProps = state => {
	const siteId = getSelectedSiteId( state );
	const siteChecklist = getSiteChecklist( state, siteId );
	return { siteId, siteChecklist };
};
const mapDispatchToProps = null;

export default connect( mapStateToProps, mapDispatchToProps )( ChecklistShow );
