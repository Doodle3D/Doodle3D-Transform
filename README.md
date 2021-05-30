# Doodle3D-App
Doodle3D Transform is a free and open-source web-app that makes designing in 3D easy and fun! Created with love by Casper, Peter, Rick, Nico, Jeroen, Simon, Donna and Arne. With the support of 1,626 Kickstarter backers.

As of 2021-05-26 Doodle3D Transform is distributed under the MIT License. This gives everyone the freedoms to use Doodle3D Transform in any context: commercial or non-commercial, public or private, open or closed source.

![Screenshot](screenshot.png)

## Prerequisites
- Install [Node.js](https://nodejs.org/en/) v6 LTS (v8 is not supported yet).
- Update NPM to at least v5.  
  `$ npm install npm@latest -g`

## Install
- Clone our repo.  
  `$ git clone git@github.com:Doodle3D/Doodle3D-App.git`
- Go into it.  
  `$ cd Doodle3D-App`
- Install all dependencies  
  `$ npm install`
- Setup environment variables, see below.

## Run
Start the server, you can visit it at http://localhost:8080
```
npm start
```

## Create distribution
To create a optimized version of our app that's ready for deployment run:
```
npm run dist
```
To test this distribution start our app in production mode by running:
```
npm run start-production
```

## Build & Run as App
[Cordova](https://cordova.apache.org/) is used to build the app. Before building with Cordova, it needs to be installed.
```
npm run cordova:install
```
- **Run iOS** (mac only)  
  Build app and deploy to ios device:  
  `npm run ios`
- **Emulate iOS** (mac only)  
  Build app and start iOS emulator:  
  `npm run ios-emulate [-- -{platform}]`
- **Run Android**  
  Build app and deploy on device or emulator:  
  `npm run android`
- **Run Windows** (win only)  
  Build app and deploy on device:  
  `npm run windows`

## Import / Export dev tool
In `Developer tools` > `Console`:
- `files.exportFile(name)`
  - `name`: name of file to export

  ```
  files.exportFile('star')
  ```
- `files.importFile(data, name)`
  - `data`: result of `exportFile` between single quotes
  - `name`: override name of file (optionally)

  ```
  files.importFile('{"data":[{"height":40,"transform":{"metadata":{"library":"CAL","type":"Matrix"},"matrix":[1,0,-7.73286467486821,0,1,18.980667838312854]},"sculpt":[1,1,1],"cut":[true,true],"twist":0,"type":"STAR","star":{"rays":5,"innerRadius":25,"outerRadius":53}}],"_attachments":{"img":{"content_type":"image/jpeg","digest":"md5-NOT2LxdCerpIrG/7vEczDw==","length":7442,"stub":true}},"_id":"star","_rev":"3-6ea2bc9e62628a25078d9d8d90aff151"}','imported star')
  ```
- `files.loadAllNames()`  
  Get a list of the names all saves sketches

