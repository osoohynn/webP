import React from "react";

export default function Option({ value, onChange }) {
  return (
	<div style={{
		display: "flex",
		alignItems: "center",
		gap: 8,
		marginTop: 16,
	}}>
		<div style={{
			padding: "4px 12px",
			borderRadius: 1000,
			border: `${value === "300자 이내" ? "#FF5555 1px solid" : ""}`,
			background: value === "300자 이내" ? "#FF7878" : "white",
			color: value === "300자 이내" ? "white" : "black",
			cursor: "pointer",
			boxShadow: `0px 0px 1px 1px ${value === "300자 이내" ? "rgba(255, 133, 133, 0.5)" : "rgba(133, 133, 133, 0.5)"}`
		}} onClick={() => onChange("300자 이내")}>
			300자 이내
		</div>
		<div style={{
			padding: "4px 12px",
			borderRadius: 1000,
			border: `${value === "300~600자" ? "#FF5555 1px solid" : ""}`,
			background: value === "300~600자" ? "#FF7878" : "white",
			color: value === "300~600자" ? "white" : "black",
			cursor: "pointer",
			boxShadow: `0px 0px 1px 1px ${value === "300~600자" ? "rgba(255, 133, 133, 0.5)" : "rgba(133, 133, 133, 0.5)"}`
		}} onClick={() => onChange("300~600자")}>
			300~600자
		</div>
		<div style={{
			padding: "4px 12px",
			borderRadius: 1000,
			border: `${value === "600자 이상" ? "#FF5555 1px solid" : ""}`,
			background: value === "600자 이상" ? "#FF7878" : "white",
			color: value === "600자 이상" ? "white" : "black",
			cursor: "pointer",
			boxShadow: `0px 0px 1px 1px ${value === "600자 이상" ? "rgba(255, 133, 133, 0.5)" : "rgba(133, 133, 133, 0.5)"}`
		}} onClick={() => onChange("600자 이상")}>
			600자 이상
		</div>
	</div>
  );
}