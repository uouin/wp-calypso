/** @format */
/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { mergeHandlers } from 'state/action-watchers/utils';
import { REWIND_STATE_REQUEST, REWIND_STATE_UPDATE } from 'state/action-types';
import { http } from 'state/data-layer/wpcom-http/actions';
import { dispatchRequestEx, makeParser } from 'state/data-layer/wpcom-http/utils';
import { errorNotice } from 'state/notices/actions';
import { rewind } from './schema';

import downloads from './downloads';

const fetchRewindState = action =>
	http(
		{
			apiVersion: '1.1',
			method: 'GET',
			path: `/sites/${ action.siteId }/rewind`,
			query: {
				force: 'wpcom', // this should not be needed, but I don't know why it is
			},
		},
		action
	);

const updateRewindState = ( { siteId }, data ) => ( {
	type: REWIND_STATE_UPDATE,
	siteId,
	...data,
} );

export default mergeHandlers( downloads, {
	[ REWIND_STATE_REQUEST ]: [
		dispatchRequestEx( {
			fetch: fetchRewindState,
			onSuccess: updateRewindState,
			onError: () =>
				errorNotice( translate( 'Failed to fetch Rewind information, please contact support.' ) ),
			fromApi: makeParser( rewind, {} ),
		} ),
	],
} );
