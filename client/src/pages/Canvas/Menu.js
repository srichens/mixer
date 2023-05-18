import React from "react";
import "./canvas.css";

const Menu = ({ setLineColor, setLineWidth, setLineOpacity, canvasRef }) => {
	const openDialog = () => {
		const dialog = document.getElementById("download-modal");
		dialog.showModal();
	};

	const closeDialog = () => {
		const dialog = document.getElementById("download-modal");
		dialog.close();
	};

	const downloadFile = () => {
		const fileName = document.getElementById("file-name").value;
		const canvas = canvasRef.current;
		// Download logic here
		const link = document.createElement('a');
		const newFileName = fileName + '.png';

		const downloadCanvas = document.createElement('canvas');
		const downloadContext = downloadCanvas.getContext('2d');

		// Set the same width and height as the original canvas
		downloadCanvas.width = canvas.width;
		downloadCanvas.height = canvas.height;

		// Set the background color
		downloadContext.fillStyle = '#ffffff';
		downloadContext.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);

		// Draw the existing canvas onto the download canvas
		downloadContext.drawImage(canvas, 0, 0);

		link.download = newFileName;
		link.href = downloadCanvas.toDataURL('image/png');
		link.click();
	};

	return (
		<div className="Menu">
			<label>Brush Color </label>
			<input
				type="color"
				onChange={(e) => {
					setLineColor(e.target.value);
				}}
			/>
			<label>Brush Width </label>
			<input
				type="range"
				min="3"
				max="20"
				onChange={(e) => {
					setLineWidth(e.target.value);
				}}
			/>
			<label>Brush Opacity</label>
			<input
				type="range"
				min="1"
				max="100"
				onChange={(e) => {
					setLineOpacity(e.target.value / 100);
				}}
			/>

			<button
				type="button"
				onClick={openDialog}
			>
				Download
			</button>

			<dialog id="download-modal">
				<div className="modal-header">
					<h5 className="modal-title">
						File Name:
					</h5>
				</div>
				<div className="modal-body">
					<form>
						<div>
							<input
								type="text"
								id="file-name"
								placeholder="Enter file name"
							/>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button
						type="button"
						onClick={closeDialog}
					>
						Close
					</button>
					<button
						id="download-btn"
						type="button"
						onClick={downloadFile}
					>
						Download
					</button>
				</div>
			</dialog>
		</div>
	);
};

export default Menu;