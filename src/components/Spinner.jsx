import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import loading from "./loading.json";

class Spinner extends React.Component {
	constructor(props) {
		super(props);
		this.player = React.createRef();
	}
	render() {
		return (
			<div
				className="spinner"
				style={{
					position: "absolute",
					zIndex: "100",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<Player
					ref={this.player}
					autoplay={true}
					loop={true}
					controls={true}
					src={loading}
					speed={2}
					style={{ height: "300px", width: "300px" }}
				></Player>
			</div>
		);
	}
}

export default Spinner;
