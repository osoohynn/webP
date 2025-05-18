import React from "react";

export default function Option({ value, onChange }) {
  return (
		<select id="length" name="length" 
		value={value} onChange={e => onChange(e.target.value)}>
			<option value="300자 이내">300자 이내</option>
			<option value="300자 ~ 600자">300자 ~ 600자</option>
			<option value="600자 이상">600자 이상</option>
		</select>
  );
}