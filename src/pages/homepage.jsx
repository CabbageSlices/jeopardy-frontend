import React, {useState} from 'react';
import host from 'game-management/host'
import styled,  {css} from 'styled-components'

const Modal = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	background-color: rgba(0,0,0,0.7);
	opacity: 0.8;
	width: 100vw;
	height: 100vh;
`;

const modalStyle = {
	position:'fixed',
	left: 0,
	top: 0,
	backgroundColor: "rgba(0, 0, 0, 0.7",
	opacity: 0.8,
	width: "100vw",
	height: "100vh",
	zIndex: 99
}

const containerStyle = {
	position:'relative'
}

const onHostGame = (setIsConnecting) => {
	console.log(host);
	setIsConnecting(true);
	host.connect().then(
		(code) => 
			setTimeout(() => {
				console.log("connected successfully!  " + code );
				setIsConnecting(false);
			}, 1000),
		() => setTimeout(() => {
			setIsConnecting(false);
		}, 500)
	);
}

const Homepage = props => {
	
	const [isConnecting, setIsConnecting] = useState(false);

	return (
	<div style={containerStyle}>
		<h1>
				Jeopardy UPDATED
		</h1>
		<button onClick={() => onHostGame(setIsConnecting)}>
			Host Game
		</button>
		<button>
			Join Game
		</button>
		{isConnecting && (
			<Modal>
				<h1>Connecting</h1>
			</Modal>
		)}
	</div>
)
}

export default Homepage;