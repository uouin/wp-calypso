/** @jest-environment jsdom */

/**
 * External dependencies
 *
 * @format
 */
import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { identity, noop } from 'lodash';
import { spy } from 'sinon';

/**
 * Internal dependencies
 */
import Dialog from 'components/dialog';
import FormTextInput from 'components/forms/form-text-input';
import { EmbedDialog } from '../dialog';

describe( 'EmbedDialog', () => {
	test( 'should render', () => {
		const url = 'https://www.youtube.com/watch?v=JkOIhs2mHpc';
		const wrapper = shallow(
			<EmbedDialog
				embedUrl={ url }
				siteId={ 5089392 }
				onCancel={ noop }
				onUpdate={ noop }
				translate={ identity }
			/>
		);

		assert.isFalse( wrapper.instance().props.isVisible );
		assert.strictEqual( wrapper.find( '.embed__title' ).length, 1 );
		assert.strictEqual( wrapper.find( FormTextInput ).length, 1 );
		assert.strictEqual( wrapper.find( FormTextInput ).get( 0 ).props.defaultValue, url );
	} );

	test( 'should update embedUrl state when Embed URL input changes', () => {
		const originalUrl = 'https://www.youtube.com/watch?v=ghrL82cc-ss';
		const newUrl = 'https://videopress.com/v/DNgJlco8';
		const wrapper = shallow(
			<EmbedDialog
				embedUrl={ originalUrl }
				siteId={ 5089392 }
				onCancel={ noop }
				onUpdate={ noop }
				translate={ identity }
			/>
		);
		const mockChangeEvent = {
			target: { value: newUrl },
		};

		const inputField = wrapper.find( FormTextInput ).get( 0 );

		assert.strictEqual( inputField.props.defaultValue, originalUrl );
		wrapper.find( FormTextInput ).simulate( 'change', mockChangeEvent );

		assert.strictEqual( wrapper.state().embedUrl, newUrl );
	} );

	test( 'should return the new url to onUpdate when updating', () => {
		const originalUrl = 'https://www.youtube.com/watch?v=R54QEvTyqO4';
		const newUrl = 'https://videopress.com/v/x4IYthy7';
		const mockChangeEvent = {
			target: { value: newUrl },
		};
		let currentUrl = originalUrl;
		const onUpdate = url => {
			currentUrl = url;
		};
		const wrapper = shallow(
			<EmbedDialog
				embedUrl={ originalUrl }
				siteId={ 5089392 }
				onCancel={ noop }
				onUpdate={ onUpdate }
				translate={ identity }
			/>
		);

		assert.strictEqual( currentUrl, originalUrl );
		wrapper.find( FormTextInput ).simulate( 'change', mockChangeEvent );
		wrapper.instance().onUpdate();
		assert.strictEqual( currentUrl, newUrl );
	} );

	test( 'should not return the new url to onUpdate when canceling', () => {
		const originalUrl = 'https://www.youtube.com/watch?v=JkOIhs2mHpc';
		const newUrl = 'https://videopress.com/v/GtWYbzhZ';
		const mockChangeEvent = {
			target: { value: newUrl },
		};
		const noopSpy = spy( noop );
		let currentUrl = originalUrl;
		const onUpdate = url => {
			currentUrl = url;
		};
		const wrapper = shallow(
			<EmbedDialog
				embedUrl={ originalUrl }
				siteId={ 5089392 }
				onCancel={ noopSpy }
				onUpdate={ onUpdate }
				translate={ identity }
			/>
		);

		assert.strictEqual( currentUrl, originalUrl );
		wrapper.find( FormTextInput ).simulate( 'change', mockChangeEvent );
		assert.isFalse( noopSpy.called );
		wrapper.find( Dialog ).simulate( 'cancel' );
		assert.isTrue( noopSpy.called );
		assert.strictEqual( currentUrl, originalUrl );
	} );
} );
