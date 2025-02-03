// Helper: Resize the canvas to fit the window
function resizeCanvas(canvas) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

// Helper: Convert seconds to HH:MM:SS format
function secondsToHms(seconds) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor(seconds % 60);
	return `${h}h ${m}m ${s}s`;
}

// Pre-load and cache icons
const iconCache = {};
function preloadIcons(icons) {
	Object.keys(icons).forEach((key) => {
		const img = new Image();
		img.src = icons[key];
		iconCache[key] = img; // Store the loaded image in the cache
	});
}

// Draw stats on the canvas
function drawStats(ctx, stats) {
	const {
		cpuLoad,
		totalMem,
		freeMem,
		osName,
		averageCpuTemp,
		uptime,
		username,
		graphics,
		totalDiskSpace,
		freeDiskSpace,
	} = stats;

	const canvas = ctx.canvas;
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
	ctx.font = 'bolder 25px Arial';

	// Array defining stats and their positions/colors/icons
	const statsArray = [
		{
			label: `${cpuLoad}%`,
			x: 570,
			y: 410,
			color: '#ffffff',
			icon: 'cpu',
		},
		{
			label: `${totalMem} GB`,
			x: 1210,
			y: 600,
			color: '#ff9999',
			icon: 'ram',
		},
		{
			label: `${freeMem} GB`,
			x: 580,
			y: 600,
			color: '#99ff99',
			icon: 'ram',
		},
		{
			label: ``,
			x: canvas.width / 2 - 15,
			y: canvas.height / 2 - 70,
			color: '#000000',
			icon: 'budgie',
		},
		{
			label: `${averageCpuTemp}°C`,
			x: 1250,
			y: 410,
			color: '#ffffff',
			icon: 'temp',
		},
		{
			label: `${secondsToHms(uptime)}`,
			x: canvas.width / 2 - 75,
			y: canvas.height / 2 - 220,
			color: '#ffffff',
			icon: null,
		},
		{
			label: `${username}`,
			x: canvas.width / 2 - 55,
			y: canvas.height / 2 + 50,
			color: '#000000',
			icon: null,
		},
		{
			label: `${osName}`,
			x: canvas.width / 2 - 60,
			y: canvas.height / 2 + 75,
			color: '#000000',
			icon: null,
		},
		{
			label: `${graphics}`,
			x: canvas.width / 2 - 235,
			y: canvas.height / 2 + 250,
			color: '#ffffff',
			icon: 'graphics',
		},
		{
			label: `${totalDiskSpace} GB`,
			x: 1150,
			y: 680,
			color: '#ff9999',
			icon: 'drive',
		},
		{
			label: `${freeDiskSpace} GB`,
			x: 620,
			y: 680,
			color: '#99ff99',
			icon: 'drive',
		},
	];

	statsArray.forEach((stat) => {
		const { label, x, y, color, icon } = stat;

		// Draw icon (from cache)
		if (icon && iconCache[icon]) {
			const img = iconCache[icon];
			const iconSize = 40;
			const textWidth = ctx.measureText(label).width;
			const iconX = x + textWidth / 2 - iconSize / 2; // Center icon relative to text
			ctx.drawImage(img, iconX, y - 40, iconSize, iconSize); // Place icon above text
		}

		// Draw text
		ctx.fillStyle = color;
		const textWidth = ctx.measureText(label).width;
		ctx.fillText(label, x, y + 20); // Text is slightly below icon for a column effect
	});
}

// Periodically update the canvas with system stats
function updateCanvas() {
	const canvas = document.getElementById('systemCanvas');
	const ctx = canvas.getContext('2d');
	resizeCanvas(canvas);

	// Preload icons before starting the interval
	const icons = {
		cpu: 'icons/cpu.svg',
		ram: 'icons/ram.svg',
		budgie: 'icons/budgie.svg',
		temp: 'icons/temp.svg',
		graphics: 'icons/graphics.svg',
		drive: 'icons/drive.svg',
	};
	preloadIcons(icons);

	setInterval(async () => {
		const stats = await window.systemAPI.getStats();
		drawStats(ctx, stats);
		console.log(mainWindow.getTitle());
	}, 1000);
}

document.addEventListener('DOMContentLoaded', updateCanvas);
