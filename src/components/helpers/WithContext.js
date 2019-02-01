import React from 'react';
import { Consumer } from '../../context';

export const withContext = Component => props => {
	return <Consumer>{value => <Component {...props} {...value} />}</Consumer>;
};
