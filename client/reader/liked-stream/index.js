/** @format */
/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { likes } from './controller';
import {
	preloadReaderBundle,
	initAbTests,
	updateLastRoute,
	sidebar,
} from 'client/reader/controller';

export default function() {
	page( '/activities/likes', preloadReaderBundle, initAbTests, updateLastRoute, sidebar, likes );
}
