import React from "react";

// TODO: there are two relevant parts here: date + workout {exercise: [weight x reps]}
export default function WorkoutRecord({ date, workout }) {
	if (!workout || !Object.keys(workout).length) {
		return null;
	}

	return (
		<div className="text-gray-400 text-sm">
			<h2>{date}</h2>

			{Object.entries(workout).map(([exercise, sets], index) => (
				<div key={index}>
					{exercise}: {sets.join(", ")}
				</div>
			))}
		</div>
	);
}
