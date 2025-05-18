import React, { useState } from "react";

export default function Option({ value, onChange }) {
  return (
		<select id="length" name="length" 
		value={value} onChange={e => onChange(e.target.value)}>
			<option value="short">짧게</option>
			<option value="medium">중간 길이로</option>
			<option value="long">길게</option>
		</select>
  );
}