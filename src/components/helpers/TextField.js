import React from 'react';

const TextField = props => {
	return (
		<div className="form-group">
			<label
				htmlFor={props.name}
				className={props.long === 'long' ? 'form-label--long' : 'form-label'}>
				{props.title}
			</label>
			<input
				className={props.class}
				id={props.name}
				name={props.name}
				type={props.type}
				value={props.value}
				onChange={props.handleOnChange}
				placeholder={props.placeholder}
				{...props}
			/>
		</div>
	);
};

export default TextField;
