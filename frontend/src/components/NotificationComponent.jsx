import React, { useState, useEffect } from "react";

const NotificationComponent = () => {
	const [notifications, setNotifications] = useState([]);
	let ws;

	const fetchNotifications = () => {
		if (ws.readyState === WebSocket.OPEN) {
			ws.send("fetch_notifications");
		}
	};

	useEffect(() => {
		ws = new WebSocket("ws://localhost:9081/ws/notifications");

		ws.onmessage = (event) => {
			const newNotifications = JSON.parse(event.data);
			setNotifications(newNotifications);
		};

		ws.onopen = () => {
			console.log("WebSocket connection established");
		};

		ws.onclose = () => {
			console.log("WebSocket connection closed");
		};

		return () => {
			ws.close();
		};
	}, []);

	return (
		<div>
			<h1>Notifications</h1>
			<button onClick={fetchNotifications}>Get Notifications</button>
			<ul>
				{notifications.map((notification, index) => (
					<li key={index}>{notification.message}</li>
				))}
			</ul>
		</div>
	);
};

export default NotificationComponent;
