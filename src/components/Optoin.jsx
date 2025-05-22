import React from "react";

export default function Option({ value, onChange }) {
  return (
	<div style={{
		display: "flex",
		alignItems: "center",
		gap: 4,
		marginTop: 16
	}}>
		<div style={{
			padding: "4px 12px",
			borderRadius: 1000,
			border: "#FF5555 1px solid",
			background: value === "300자 이내" ? "#FF5555" : "white",
			color: value === "300자 이내" ? "white" : "black",
			cursor: "pointer"
		}} onClick={() => onChange("300자 이내")}>
			300자 이내
		</div>
		<div style={{
			padding: "4px 12px",
			borderRadius: 1000,
			border: "#FF5555 1px solid",
			background: value === "300~600자" ? "#FF5555" : "white",
			color: value === "300~600자" ? "white" : "black",
			cursor: "pointer"
		}} onClick={() => onChange("300~600자")}>
			300~600자
		</div>
		<div style={{
			padding: "4px 12px",
			borderRadius: 1000,
			border: "#FF5555 1px solid",
			background: value === "600자 이상" ? "#FF5555" : "white",
			color: value === "600자 이상" ? "white" : "black",
			cursor: "pointer"
		}} onClick={() => onChange("600자 이상")}>
			600자 이상
		</div>
	</div>
  );
}