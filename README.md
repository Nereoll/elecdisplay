# Elecdisplay

Elecdisplay is an Electron-based application that displays system statistics on a canvas. It provides real-time information about CPU load, memory usage, operating system details, uptime, and more.
**it was made to fit this wallpaper** : 

![[wallpaper/bg_spiderman_1920-1080.png]]

## Features

- Transparent and frameless window
- Real-time system statistics display
- Customizable canvas with icons and text
- Electron-based for cross-platform compatibility

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/elecdisplay.git
    cd elecdisplay
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

To start the application, run in your app directory:
```sh
npm start
```

## Development
### Project Structure
- `main.js`: Main process script that creates the Electron window.
- `preload.js`: Preload script that exposes system information APIs to the renderer process.
- `renderer.js`: Renderer process script that handles canvas drawing and updates.
- `index.html`: HTML file that contains the canvas element.
- icons: Directory containing icon images used in the canvas. (i do not own any of this icon, they are part of the papirus icon theme : https://github.com/PapirusDevelopmentTeam/papirus-icon-theme )

### Scripts
in the project directory you can run : 
- `npm start`: Starts the Electron application.
- `npm install`: downloads all the dependencies for the app to run

### Dependencies
- electron: Framework for building cross-platform desktop apps with JavaScript, HTML, and CSS.
- systeminformation: Library for retrieving system hardware and software information.
### DevDependencies
- electron-builder: Tool for packaging and building Electron applications.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the ISC License. See the LICENSE file for details.

## Author
nereol
## Acknowledgements
Electron
Systeminformation

