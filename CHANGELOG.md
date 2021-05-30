## [0.23.0] - 2021-05-26

### Fixed

### Changed
- Doodle3D Transform released as open source on https://github.com/doodle3d/Doodle3D-Transform with MIT License.
- Removed the need for user accounts
- Removed server sided storage of sketches
- Removed server sided scripting
- Sketches are now saved in LocalStorage using Pouchdb

### Added
- Added donation page
- Added new video tutorial: https://youtu.be/rkZNNzSJBps

## [0.22.3] - 2019-3-20

### Fixed
- Saving on iOS devices

### Changed
- Change dialog now displays save and close button next to each other in the save doodle dialog
- Decrease size of menu items on smaller screens

### Added
- Make export line width configurable through config
  - `config.set({ exportLineWidth: \LINE WIDTH IN MM\ });`

## [0.22.2] - 2019-3-16

### Fixed
- Keep checkout button disabled when reloading user permissions

## [0.22.1] - 2019-3-14

### Fixed
- Disable checkout button when submitting

## [0.22.0] - 2019-2-21

### Changed
- Google Sign in API URL to comply with deprecated google plus sign in

### Fixed
- fixed bug where menu items can be dragged

## [0.21.0] - 2018-6-27

### Changed
- rename `d3sketch` to `doodle3d`
- Login / Register / Payment flow
  - Login / Register / Payment pages are now overlays on top of the app
  - The "Choose a plan" page is removed, instead you are redirected to the payment page
- Export is now a pop over menu on the right side of the screen
- Changed price
- Left side hamburger menu is replaced by dedicated buttons on the top of the app

### Removed
- Mail plugin for iOS (it's supported natively with the files plugin)
- Dashboard
- Choose a plan page (it is not possible to create a free account anymore)

### Fixed
- Change password can close, even if the password is not changed (just for student accounts)

## [0.20.0] - 2018-5-7

### Added
- Added function to disable mouse wheel listener
- Send name to slicer, so a filename can be generated when downloading the file
- Prompt middleware, is used ind
  - 3D hubs upload
  - print to wifi
  - MyMiniFactory
  - Share Doodle
  - Polar3D
  - Thingiverse
- Option to import Doodles

### Changed
- Url paths now contains '-' instead of '_ '
- Change copy of product description

### Removed
- Email file
- Maximum files warning on save page for free users
- Sentry

## [0.19.2] - 2018-4-13

### Fixes
- Opening My Doodles page

## [0.19.1] - 2018-4-5

### Fixed
- Sending mail after registering
- Error in email send page
- Redirecting after logging in

## [0.19.0] - 2018-4-3

### Fixed
- Open sketch is now an undoable
- Images on the help page are now correctly loaded

### Changed
- More consistent use of spinners
- Style of authenticate components
- Changing tools is now an undoable
- Add hotkeys
  - `s` for TRANSFORM TOOL
  - `e` for ERASER TOOL
  - `c` for CIRCLE TOOL
  - `l` for POLYGON TOOL

### Removed
- Talkus (chat support)

## [0.18.1] - 2018-2-21

### Changed
- Print with Doodle3D Slicer now requires paid account
- Print with Polar Cloud now requires paid account
- Decrease initial text size

### Fixed
- Text tool now renders correctly after opening

## [0.18.0] - 2018-2-15

### Added
- Warning text on mobile divices
- Export to polar3d
- Show warning when leaving page with unsaved work

### Changed
- Removed popup for text input, added in canvas text editing
- Added Fonts (from Google Fonts)
  - OSWALD
  - RANGA
  - JOTI_ONE
  - BELLEFAIR
  - LOBSTER
  - ABRIL_FATFACE
  - PLAY
  - FASCINATE
- Improved hit area of text (changed from each letter being the hitarea to a square around the text as a hitarea)
- Updated file format
  - Removed image guides from file format
- Use amazon for downloads
- Cutoff long file names
- Remove slicer interface from app and use print.doodle3d.com instead

### Fixed
- Normalize mouse wheel (scrolling should now have the same effect in all browsers)
- Bugs in mollie payment

### Performance
- Group overapping holes and apply boolean operation seperatly with each group

## [0.17.6] - 2017-12-20

### Fixed
- Slicer was unable to slice models with the new hole material

## [0.17.5] - 2017-12-14

### Changed
- Added image compression on all images (decreases images from 500kb to 130kb)

### Fixed
- iOS devices were unable to login
- All 3d shapes were constructed each time due to invalid need update check
- 2D render order after selection
- Pen snapping
- Generating stl with holes

## [0.17.4] - 2017-12-12
### Changed
- Colors in the color menu

### Fixed
- Bugs regarding holes tool
  - Winding order of 3d shapes
  - Boolean subtracted shapes now produce solid shapes
- Updated wk webview to resolve iOS app click timeout problem

## [0.17.3] - 2017-12-11
### Fixed
- Use less points in circle to increase performance of the holes tool was actualy generating more points

## [0.17.2] - 2017-12-11
### Fixed
- Holes didn't work on some shapes

### Changed
- Remove image guide transparency to easier pick colors from imported images
- Use less points in circle to increase performance of the holes tool

## [0.17.1] - 2017-12-07
### Changed
- Added colors to the color menu

### Removed
- Export to Formide

## [0.17.0] - 2017-12-06
### Added
- Support for Students
  - Student accounts have full access to Doodle3D transform
- User accounts can have no password, they will however be promted with a change password popup on firstlogin
- Holes material enabling 3D cut-outs
- Thumbnails are now saved as png, enabling transparency
- Pipet tool for selecting color from other shapes or from image
- Slicer User Interface
  - Enables rotating and scaling before slicing
  - Improved settings dialogs

### Changed
- Moved Doodle3D-Core to own repo
- Used different toon shader
  - Different style due to MatCap Shader
  - Less render passes so increased performance
- Dropping d3sketch files on the app now merges the dropped file with the current doodle
- Copy of product info
- A record of total number of sketches is now stored in the userd DB
- Use improved notification system
  - Improved design
  - More functionality in notification (such as title, body and buttons)
- Community popups are bigger and rendered in MaterialUI dialog
- Brush sizes are now smaller (brush sizes are now small: 2mm medium: 4mm large: 10mm)
- Move 2d merge and cutout tools to context menu

## [0.16.7] - 2017-11-22

### Added
- Prefilled voucher codes

## [0.16.6] - 2017-10-25

### Fixed
- 3D View crashing in safari

## [0.16.5] - 2017-10-17

### Fixed
- Some filled shapes were impterpeted as hollow by the Slicer, used THREE triangulate to Fixed
- Event bubbling in file thumbs

### Added
- Support for teacher - student accounts when redeeming school voucher
- Support for new printers

### Changed
- display distance in mm

## [0.16.4] - 2017-10-2

### Fixed
- Link click handler now responds to clicks

## [0.16.3] - 2017-10-2

### Changed
- On Share "back" button closes the popup
- Remove delay when opening submenu's

### Fixed
- A href links for iOS (e.g. Login & Sign up button)
- Disable autofocus of text fields in iOS
- Added missing space to copy

## [0.16.2] - 2017-9-28

### Changed
- Using other library to enable fast clicks on buttons
- Have  Share popup open Shared popup over sketch page
- Share and Shared popups's cancel/close now route to parent route.
- Removed forms auto focus on mobile and tablet devices #1027

### Fixed
- Delayed click on menu causing click in drawing area #1026
- Removed, now unnecessary delay before toolbar popups close.

## [0.16.1] - 2017-9-27

### Added
- Sharing from export page #994
- Opening shared doodle from community doodles admin page
- Sharing for anonymous users in iOS app #1022

### Fixed
- Fixed issue where some shapes would be printed hollow. slicer:#26

## [0.16.0] - 2017-9-25

### Added
- All users are now able to share #582
- MyMiniFactory export option #698
- Height (in 3D) measurements #111
- 2D Union tool #228
- 2D Subtract shape tool #34
- Cordova assets generate script
- Move selection using arrow keys #688
- Allow importing json files as sketches

### Fixed
- Small fixes for anonymous mode in cordova apps #995
- Fixed deleting shared community doodles #987
- Refactored shared sketches and content code
- Improved community doodles admin #992
- Fixed using customized nested slicing settings
- Fixed opening non weburl's in cordova
- Fixed showing thingiverse upload error message
- 3DHubs popup fallback when popup blocked
- Handling trace started outside of shape and ending on shape
- Partial receipt check when restoring payment
- Catching logging errors #1006
- Fixed saving files on iOS by sanitizing filenames
- Clipper-lib:
  - Order vector points not switched after simplification
- Slicer (0.0.8 > 0.0.13)
  - Combing
  - Adding polyfills in worker
  - Clean open shapes
  - Cleaning paths (rounding errors) resulting in smoother walls

### Changed
- Updated Doodle3D-Slicer
  - added combing
  - fixed rounding
- Using webpack image loader for all js loaded images
- Using custom view to download featured doodles (faster)
- Allow anonymous saving, exporting (some) and payments
- Remove cancel and add buttons from add image page #1001

## [0.15.7] - 2017-9-7

### Added
- Support for anonymous access in cordova apps

## [0.15.6] - 2017-9-11

### Fixed
- Google analytics #999
- Free users are no longer able to save multiple files #985

## [0.15.5] - 2017-9-5

### Added
- Restore button

### Changed
- iOS Payment type

## [0.15.4] - 2017-8-31

### Changed
- Don't show link to "Expore our plans for education" for cordova apps

## [0.15.3] - 2017-8-29

### Fixed
- Inline images in Cordova app
- Responsiveness of form elements and upgrade page

### Changed
- Loading licenses and changelog in app

## [0.15.2] - 2017-8-29

### Added
- iOS Cordova app icon & splash screen
- Sending platform to google analytics #990

### Fixed
- Sending app version to google analytics

## [0.15.1] - 2017-8-26

### Fixed
- Some users getting a "Unable to get property 'slice' ..." error #458

## [0.15.0] - 2017-8-25

### Added
- Show 2D dimensions #111
  - Polygon tool
  - Circle tool
  - Transform tool
- iOS App ready #284
  - In app purchases #940
  - Implement authenticate popups in cordova  #958 #770
  - Working links
-	Logging payments to Google Analytics #950
- Added "Use your license key" link to choose a plan page #961
- Predefined jumbotron content styles
- Mobile (thin) screen ready #970

### Fixed
- Popup open issues by directly opening target url, instead of first loading a loader page
- Limiting username field to 16 characters #957
- Improved client side username validation #965
- Improved client side password validation
- Auto filling username by replacing invalid characters with '-' #965
- Improved spacing texts #939
- Authenticate users with all databases after login (fixing admin) #972
- Improved doodle thumbnails style
- Updated community doodle popups style #978
- Improved save page form #979
- iOS safe mode "removeItem is not a function" issue #842
- Save limitation for free user #985
- Several copy improvements

### Changed
- Set pla and medium quality as default WiFi-Box export settings #960
- Removed banner close button #844
- Banner design and showing it on thinner screens #844
- Allow up to 8 community doodles to be displayed #966
- Load jumbotron covers as background images (enabling smaller images) #973
- Publishing without source in source map #974

## [0.14.2] - 2017-8-11

### Fixed
- Page wouldn't load in IE 11 #962

## [0.14.1] - 2017-8-10

### Fixed
- Unresponsive buttons on touch enabled devices #956

## [0.14.0] - 2017-8-7

### Added
- Licenses page #185
- Showing export limitations copy to free users #848
- Hotjar analytics #955
- Sending plan to analytics #952

### Fixed
- Copy: save page #938
- Copy: please upgrade popup #937
- Doodle3D WiFi-Box export:
  - Slicer extruder calculations
  - Slicer filters out empty slice parts

### Changed
- Removed logout button from upgrade page #847
- Doodle3D WiFi-Box export:
  - Performance improvement
  - Removed overlap infill setting setting
  - Split fill settings into inner and outer fill
  - Optimized printing speed of closed non filled paths
  - Reorganized customize settings page

## [0.13.2] - 2017-7-31

### Fixed
- Import image from camera #935

## [0.13.1] - 2017-7-27

### Fixed
- White screen, caused by not checking availability hot reloader
- Slicer: fixed extrusion calculations
- Country selection issues on checkout page #909
- Removed 'null' from WiFi-Box export progress dialog

## [0.13.0] - 2017-7-26

### Added
- Free plan, with limited access:
  - No exports
  - Saving 1 sketch
  - Shows clickable banner
- Upgrade to paid plan in app

### Fixed
- Downloading community sketches only once
- Slicing settings are properly merged
- Customizing slicer settings

### Changed
- Improved onboarding flow
  - Pre-fill username
  - Turned some notifications into separate pages

## [0.12.0] - 2017-7-25
### Added
- First version of our Doodle3D WiFi-Box export!
  - Slicing 3D models using our own slicer
  - Using predefined profiles, but allowing customization of specific settings
  - Temporarily uploading result to our gcode server so that app can be closed (separate project)
  - Using connect.doodle3d.com for 3D printer selection (separate project)
  - New WiFi-Box firmware to support bigger prints from our gcode server (separate project)

### Fixed
- Enabling future optimizations and better development workflow by moving to Webpack3

## [0.11.2] - 2017-7-15
- Security update, requiring higher Node.js version #888

## [0.11.1] - 2017-7-3
## [0.11.0] - 2017-6-22

### Added
- [Fill / unfill selected shapes from context menu #648](/changelog/0.11.0-toggle-fill-648.gif)
- Clarify what's required in forms #422
- Also storing Formide authentication in account
- HTTP compression, making download 4x smaller #759
- [Align #35](/changelog/0.11.0-align-35.gif)

### Fixed
- Small 3D shape property validation fixes
- Fix for converting paths to bézier paths (partial fix for #580
- Fix expired export services authentication issue by temporally always requiring re-authentication #840
- Database configuration, fixing reading community doodles #680

### Changed
- Go to separate page when registration E-mail is send #444
- Show appropriate first page: register or login #609
- [Image import directly starts OS's import actions (file browser on desktop, import options popup on mobile) #543](/changelog/0.11.0-import-543.png)
- [The import button in the menu's import page isn't limited to camera capture anymore. #543](/changelog/0.11.0-import-camera-library-543.png)

## [0.10.5] - 2017-5-22

### Fixed
- Fixed refresh session, get profile requests loop

## [0.10.4] - 2017-5-17

### Added
- Logging session token and forwarded ip per request

## [0.10.3] - 2017-5-16

### Fixed
- Increased session refresh threshold to reduce the change of a requests loop

## [0.10.2] - 2017-5-9

### Fixed
- Fix importing old color files

## [0.10.1] - 2017-4-25

### Fixed
- Fixed authenticating check when session refresh fails

## [0.10.0] - 2017-4-25

### Added
- [Add intermediate steps to shape based on twist and height](/changelog/0.10.0-sculpt-handles-706.png)
- Show loader in opened popups instead of blank page  #605
- Add validation to 2D shape rendering #726
- Show loading indicator during initial user refresh #513
- Added time limit on regular requests (timeout) (#513)
- Some basic environment variables checks
- [Implement share on Thingiverse #256](0.11.0-thingiverse-256.png)
- [Brush tool #532](/changelog/0.10.0-brush-532.gif)
- Storing Sketchfab and Thingiverse authentication in account, meaning you only have to authenticate once

### Changed
- [Better sculpt tool #706](/changelog/0.10.0-sculpt-handles-706.png)
- [Height tool now scales selection as a whole instead of moving top/bottom part of individual shapes #706](/changelog/0.10.0-resize-706.gif)
- Increased user's session life, meaning you stay logged in longer #623
- Remove delay from submenu close on non iOS devices
- Increase precision when subtracting shapes (erase, bucket tools) #741
- [Pen tools icons #749](changelog/0.10.0-pencil-fineliner-brush-749.png)
- [White toolbars background on smaller screens #673](/changelog/0.10.0-toolbar-smallscreens-673.png)
- Using Sketchfab v3 api
- Show popup when register email is send #444
- Authorize step with Sketchfab and Thingiverse is now logged to google analytics into a separate link category

### Fixed
- Improved visibility menu buttons on My Doodles page #709
- Fixed thumbnail menu layout issue #689
- Improved hit area thumbnail menu button #690
- Fixed margins of lists on Terms of service and privacy policy #568
- Fixed scaling issue when a shape has no width or height
- Handle invalid local config #740
- Fixed validation to 3D shape rendering #726
- Fixed Authorization headers not send in IE11 #495
- On Safari in private mode nothing is stored, preventing quota exceeded error: DOM exception 22 #480
- Context menu submenu's not centered in all browsers #747
- Handle request response errors without response data
- Showing error properly in notifications #584
- Remove ugly oversized icons in text field in internet explorer #725
- Visual order on landing page #666
- Color selection icons in IE11 (adding svg inline) #750

## [0.9.2] - 2017-4-11

### Fixed
- Trace in internet explorer #748

## [0.9.1] - 2017-4-10
## [0.9.0] - 2017-4-4

### Added
- [Custom stroke color #694](/changelog/0.9.0-stroke-color-694.gif)
- [Change color of selection #310](/changelog/0.9.0-color-selection-310.gif)
- [Set color for drawing tools #310](/changelog/0.9.0-set-tool-color-310.gif)
- [Redo button #237](/changelog/0.9.0-redo-button-237.gif)
- Add validation to 3D shape rendering #726
- [Always show erase cursor #530](/changelog/0.9.0-eraser-cursor-530.gif)
- [Customizable eraser size #533](/changelog/0.9.0-eraser-size-533.gif)

### Changed
- Only pinch scale selected objects when one or more fingers are inside bounding box
- [Undo now always reverts to end result of actions, it doesn't include intermediate steps #661](/changelog/0.9.0-undo-661.gif)
- Also performing scan and trace's trace step in the background #704
- [You can now also scale multiple objects over 1 axis #719](/changelog/0.9.0-scale-multiple-719.gif)
- [Decreased snapping distance in freehand & polygon tool #717](/changelog/0.9.0-decreased-snapping-distance-717.gif)

### Fixed
- [Canceling text window doesn't remove text, it undo's the changes #586](/changelog/0.9.0-cancel-text-586.gif)
- Several small undo issues #661
- jagged shape after fill
- [Smooth freehand path based on zoom](/changelog/0.9.0-smooth-zoom-based.gif)
- [Smooth only the newly added path #645](/changelog/0.9.0-smooth-new-path-645.gif)
- [Improved simplification after erase](/changelog/0.9.0-improved-simplification-erase.gif)
- Improved scan & trace throttling
- After erase filtering out empty shapes
- [Filling sharp cornered areas #703](/changelog/0.9.0-fill-sharp-corners-703.gif)
- [Show loader in community doodle popup #665](/changelog/0.9.0-loader-in-popup-665.gif)

## [0.8.2] - 2017-3-29

### Fixed
- 3D Camera issue
- Backspace and delete keys not working in Talkus chat (#732)

## [0.8.1] - 2017-3-23

### Added
- Debugging overlapping dispatch issues (#631)

## [0.8.0] - 2017-3-9

### Added
- [Preloader #577](/changelog/0.8.0-preloader-577.png)
- 3D camera constrains #59
- Make export line width configurable through config #681

### Changed
- Display order in 2D based on max 3D height #385
- Increased max image size #693
- 3D Handles maintain size #223

### Fixed
- Perform trace in the background, preventing browser crashes #646
- Trace preview (red line) now also shown on image border
- iOS toolbar render issue #548
- More precise scan and trace results #675
- Removed duplicate points, preventing browser crashes #695
- Default height for thumbnail images #692
- [Disabled auto complete for license key input field #432](/changelog/0.8.0-disable-autocomplete-432.png)
- [Reset camera on open doodle #670](/changelog/0.8.0-reset-camera-on-open-doodle-670.png)

## [0.7.2] - 2017-2-28

### Changed
- Use different for-loop in menu renderer
- Remove logs in menu renderer

## [0.7.1] - 2017-2-22

### Fixed
- Only use Clipper-lib patch as dependency

## [0.7.0] - 2017-2-21
### Added
- Dynamic popups (easier way to create basic popups)
- Duplicate animation
- Send Clipper errors, console.warn console.error to Sentry
- [Keyboard shortcuts](/changelog/0.7.0-keyboard-shortcuts.gif)
  - `backspace`/`delete`: delete selected shape(s)
  - `cmd/ctrl + A`: select all
  - `cmd/ctrl + Z`: Undo
  - `cmd/ctrl + shift + Z`: Redo
  - `cmd/ctrl + S`: Save doodle
  - `cmd/ctrl + O`: My Doodles
  - `cmd/ctrl + E`: Export
  - `S`: Switch to selection tool
  - `T`: Switch to text tool
  - `B`: Switch to pen tool
  - `esc`: Close hamburger menu

### Changed
- [Crosshair cursor when dragging](/changelog/0.7.0-cursor-crosshair.gif)
- [open add image/text popup when no image/text present yet]/changelog/0.7.0-auto-open-image-popup.gif)
- Max notification width
- [Show warning notifications for unsupported exports]/changelog/0.7.0-notifications-unsupported-exports.gif)
- Removed release estimation from unsupported export warnings
- BaseURL based on environment variables
- [Slightly darker grid]/changelog/0.7.0-darker-grid.png)
- [Empty doodle name by default]/changelog/0.7.0-empty-filename-allowed.gif)
- [Default file name when exporting is Doodle]/changelog/0.7.0-default-export-filename.gif)

### Fixed
- Fix hit order on Safari and IE (making sure you can click on a line that's inside a filled shape)
- Include source (doodle3d-transform) when sending model to sketchfab
- Only close popups when successfully opened
- [When native popups are blocked show a popup with a link]/changelog/0.7.0-soft-popup-with-link-to-native-popup.png)
- [Show error notification when image import fails]/changelog/0.7.0-show-error-on-corrupt-image.gif)
- Only close Add Image popup when successful
- Zip download on iOS devices
- Enable clicks on left & right side of notifications
- [Allow text selection in notification]/changelog/0.7.0-text-selection-in-notifications.gif)
- Hit detection fix fixes some fill issues #658
- Don't download Talkus when disabled
- normals orientation of exported shapes #652
- loader indicator position in submenus

## [0.6.5] - 2017-2-16

### Changed
- logging to debug menu issue

## [0.6.4] - 2017-2-13

### Changed
- logging to debug menu issue

## [0.6.3] - 2017-2-9

### Changed
- logging to debug menu issue

## [0.6.2] - 2017-2-8

### Changed
- logging to debug menu issue

## [0.6.1] - 2017-2-7

### Fixed
- Changelog (including fixed: Fill tool sorting issue)

## [0.6.0] - 2017-2-6

### Added
- Debug arrows
- Util to retrieve database statistics
- Link to changelog
- [Polygon / polypoint (e.g. hexagon) shape](/changelog/0.6.0-polygon.gif)
- [Heart shape](/changelog/0.6.0-heart.gif)
- [Back button on forgot password page](/changelog/0.6.0-back-to-login.png)
- Client side environment variables

### Changed
- [Bigger sketch thumbnails on My Doodles page](/changelog/0.6.0-bigger-thumbnails.png)
- Changed camera angle in thumbnails
- [Auto focus into form fields](/changelog/0.6.0-autofocus-formfields.png)
- [Automatic select 'trace' tool after importing an image](/changelog/0.6.0-trace-select.gif)
- Render and trace image of max 1000px width/height instead of 500px

### Fixed
- [Reset 3D view when clearing document](/changelog/0.6.0-clear-camera-on-new.gif)
- set2DTexture warning
- Clear state on logout
- Disable selections
- Using ClipperJS patch (fixing this.ParseFirstLeft is not a function error)
- Combine WebGL checks
- Crash when saving file with image (by resizing image on import)
- Fill tool sorting issue, which could also cause Safari and IE to hang

### Changed
- Optimized mesh exports

## [0.5.4] - 2017-2-1

### Fixed
- Fixed jspm version (fixes `define is not defined`)

## [0.5.3] - 2017-2-1

### Fixed
- Handle invalid menu child and send more information to Sentry to debug

### Changed
- Rapid actions filter on Sentry breadcrumbs

## [0.5.2] - 2017-1-19

### Fixed
- Talkus now inits again

## [0.5.1] - 2017-1-19

### Fixed
- Talkus disable config

## [0.5.0] - 2017-1-18

### Added
- [Formide export: Link to specific model](/changelog/0.5.0-export-formide.gif)
- [OBJ file export](/changelog/0.5.0-export-obj-file.gif)
- [Export OBJ file to Sketchfab with colors](/changelog/0.5.0-export-sketchfab720.gif)
- [disableTalkus config](/changelog/0.5.0-disable-talkus.png)
- Enabling cross origin access for standalone deployment

### Changed
- Three.js update r73 > r83
- Using three.js toon shader (transparent selections, subtle highlight)
- Formide export: Use production api
- Formide export: enable by default and remove hiding logic
- Moved share to Sketchfab to Share your design section
- Formide export: Show export popup
- Specifying base url in requests, needed for standalone deployment

### Fixed
- 3D ui images resized to power to two,preventing warning
- Android and iOS app deploy

## [0.4.0] - 2017-1-9

### Added
- [3D Stamp tool (behind config)](/changelog/0.4.0-experimental-3dstamp-tool.gif)
  - Added '3D Spaces'
  - Height change in object's height direction
  - Sculpt change in object's sculpt direction
  - Go to 'world space' by clicking bed
  - Dotted line to indicate space
- Google Analytics

### Fixed
- Importing/Exporting with new sketch format
- Disappearing 2D view when scrolling
- Improved scrolling on iOS

## [0.3.3] - 2017-1-3

### Removed
- Christmass Share

## [0.3.2] - 2016-12-21

### Fixed
- Sculpt handle removal (for real)

## [0.3.1] - 2016-12-20

### Fixed
- Sculpt handle removal

## [0.3.0] - 2016-12-19

### Added
- Link to webshop on License key page
- Simultaneous gestures per panel

### Fixed
- Fixing selection issue (ClipperJS upgrade)
- Fixing export to stl issues (ClipperJS upgrade)
- Cross platform support multitouch in 3D panel
- Don't download sketches changes history, improving performance on startup when having many deleted sketches
- Forgot password redirects to login page

## [0.2.2] - 2016-12-14

### Fixed
- Authorization issue on Internet Explorer

## [0.2.1] - 2016-12-12

### Changed
- Added colors to button 'Share for Christmas'

## [0.2.0] - 2016-12-9

### Added
- Share sketch for Christmas event
- Binary (much smaller) stl's (shared as open source package: threejs-export-stl)
- News / jumbotron admin page
- Export to Formide (hidden)
- Log http requests & responses (filtering out sensitive data)

### Changed
- Uploading to sketchfab directly

### Fixed
- Image duplication

## [0.1.7] - 2016-12-2

### Fixed
- Fixed main menu for non-admins

## [0.1.6] - 2016-12-1

### Added
- Admin only pages to manage:
  - Featured / community sketches
  - Help page
  - Privacy policy
  - Terms and conditions
- Getting page content from database:
  - Help
  - Privacy policy
  - Terms and conditions
- Sketchfab export: adding source & draft mode
- More details per error send to Sentry

### Changed
- Disabling Raven and Talkus in develop mode
- Login label changed to username or e-mail
- Anonymous read access to privacy policy, terms and conditions, help, featured content

### Fixed
- Text input on several platforms (by not batching change actions)
- Several gesture related issues
  - Provide positions with single & multi drag end
  - Fill pre drags with position after setting idle
  - Only emit multitouch end when if current event is multitouch
  - Improved gesture logic in general
  - Always reset pointer
  - Replaced for...of loop for Safari
- Sketchfab export: fixed "Open in ..." button label
- Binary (zip) download on Safari OS X (not iOS yet)
- Error parsing ("Cannot read property 'error' of undefined" errors in forms)

## [0.1.5] - 2016-11-22

### Added
- Logging most issues to Sentry
- Enabled cross origin access
- Including version in Talkus user data

## [0.1.4] - 2016-11-18

### Changed
 - Help page now contains an intro text and a cheatsheet
 - Added help page to hamburger menu on the landingpage

### Fixed
 - Opening Doodles in safari v9

## [0.1.3] - 2016-11-16

### Added
- Added last modification date to files downloaded in zip (downloadAllSketches)
- Notifications for social auth (facebook, google)

### Fixed
- Fixed file download on Safari
- Remove whitespace around voucher before submission
- Export using official stl content/mime type
- Talkus user identification: name, username and roles.

## [0.1.2] - 2016-11-11

### Added
- Show preloader for user's own doodles
- Show app version in about page
- Find user utility
- Preloader for certain image files

### Changed
- Use HTML Image instead of base64 as internal image storage for image guide
- Image storage for sketch files
- Moved links like login below forms
- Tweak text on login and register pages

### Fixed
- Remove window ondrop handler after hot reloader
- Use objectURL instead of base64 where possible
- Little white dots instead of handles (preloader)
- Image 'ghosting' in 3D (preloader)
- Sketch import
- Respond with uncatched errors as json and log them

## [0.1.1] - 2016-11-09

### Added
- Show proper error notification on WebGL support issues

### Changed
- Register page as default route for anonymous users
- Use Express's redirect shortcut

### Fixed
- Improved visibility buttons in forms like login, register etc
- Don't crash app on WebGL support issues

## [0.1.0] - 2016-11-08

### Added
- Custom font in text popup dropdown
- Drag and drop image import
- Import image on background click
- Privacy policy
- Proper Sketchfab upload without copying api key
- Separated sketch name from internal id in sketches database
- Save all sketches (.zip) feature
- Advanced export section with existing save sketch and new save all sketches
- Voucher redemption API
- Unique name utility for file import and export (used for example for download all sketches)
- Store user as voucher redeemer
- Store voucher redemption as payment in user account
- Upgrade user (add 'basic' role) when voucher with 100% discount is used
- Authorization checks on routes for basic role.
- Payment page
- Interactive preview in community doodle popup
- Open community doodle from popup
- Sharing sketches for admin users only
- Support for button in jumbotron
- Support importing older sketches
- Serverside util to apply updated databases permissions and indexes to existing users
- Accept terms of service and privacy policy check on register
- Using preloader / spinner in jumbotron, community doodles and community doodle popup
- Authenticate and payment page background image

### Changed
- Terms of service
- Use Button component where appropriate
- Removed shader highlight
- Save logic: Only replace sketch when editing it and then saving it under the same name. A new sketch is always stored separately, even when same name is used.
- Optimized path data storage by converting it to a base64 binary string
- Jumbotron content loaded from shared database
- Community sketches loaded from shared database
- Using superlogin fork with session refresh
- Storing createdOn & updatedOn as numbers instead of strings
- Storing sketches as attachments in database
- Separated login and register pages (giving them individual routes)
- Moved secondary buttons in login and register pages to links in footnotes
- "Register" > "Create account"
- Moved all authentication related routes under /authenticate
- "Login" > "Login to Doodle3D Transform"
- Removed "go back to menu" from expand menus
- Bigger title expand menus
- Decreased opacity of unimplemented export buttons
- Show alert with explanation when clicking unimplemented export buttons
- "Open new doodle" > "New doodle"
- Removed "New doodle" from landingpage hamburger menu
- Improved notification style and position
- Added instructions to payment page
- "Voucher" > "License key"
- Disabled basic auth login
- About page
- "Open" > "My doodles"
- Temporarily using remote user sketches instead of syncing them
- "Payment" > "Enter license key"

### Fixed
- When importing, handle file extensions in both upper and lower case
- On file drop, handle multiple dots in file name
- Use sketchname as default title for Shapeways upload
- Updated superlogin-client with our PRs:
  - better error handling
  - session refresh also refreshed user roles
  - baseURL handling
- Optimized database queries

## [0.0.4] - 2016-10-06

### Added
 - Text Tool
 - Cloud syncing
 - Experimental Color Picking
 - Config (accessible via window.config)
 - Icons in menu
 - Export button
 - Help page in Hamburger menu
 - Fake community Doodles to landing page
 - upload to SketchFab
 - upload to 3D Hubs
 - upload to ShapeWays

### Changed
 - Close hamburger menu X with image
 - Style of thumbnails on landing page
 - Jumbotron on landing page to be more representative

### Removed
 - Cut tool icon removed

### Fixed
 - Pen tool on tablets
 - Export to STL
 - Less draw calls for tolerance pointer

## [0.0.3] - 2016-05-31

### Added
- Cursor for eraser

### Changed
- Toon shader lines disappearing (#168)
- Filled 2D shapes no longer have strokes
- Implemented max threshold in tolerance pointer (#232)
- When scaling too small some scale buttons become invisible
- Filled shapes have opacity of 90% (#209)
- Better handling of touch/mouse events (#219 #227 #143 #40)
- Bucket tool fill the shape more to the end of the line it's filling, filled shape is extended with the line's diameter (#224)

### Fixed
- Unable to select objects behind other objects (#218)
- Rerender after resize
- Photoguide tolerance pointer is always black (#221)
- Improve toolbar layout on smaller screens
- Selecting by dragging does not work the first time (#215)
- 2D active/inactive rerender logic (performance) (#261)
- Line collision margin when zooming

## [0.0.2] - 2016-05-04

### Added
- Submenu for pen tools (#156)
- Buttons for duplicate and remove (#173)
- Scan & Trace (#149)
- Snapping to begin and and point in pen tools (#49)

### Changed
- Every square on grid is 1 by 1 centimeter (#137)
  - Scale down 3D ui buttons
  - Decrease simplify free hand
  - Move camera closer to platform
  - Decrease default shape size
  - Scale down platform
  - Decrease default height
  - Scale down line width
- Eraser always erases 30px, doesn't matter the zoom level
- Increased eraser precision
- Increased bucket fill precision
- Bucket tool now removes outlines on fill
- Only show add image popup when no image added yet (#204)
- Merge vertices in export stl
- Initial size of photo guide (#179)

### Fixed
- Clipper no longer shows alert when fails (#148)
- Clipper now no longer fails on hit detection (#150)
- Console import/export (#165)

## [0.0.1] - 2016-04-13
### Added
- Submenu's (#68).
- Predefined shapes (submenu).
- Toonshader (only enabled when supported) (#67).
- Enabled faster clicking on buttons on touchscreen devices (#97).

### Changed
- New persistent state over hot reloads approach.

### Fixed
- Proper sharp corners between top/bottom and side on filled shapes (#140).
- Also showing sharp corners on sides more clearly (#140).
- Enable interaction through logo.
- Increased thumbnail resolution for high DPI screens.
- Image guide transparency (#154).

## [0.0.0] - 2016-04-05
### Added
- Image guide (#54)
- Polygon tool experiment (#110, #112)

### Changed
- Tweak path simplification
- Improved click detection by using Clipper

### Fixed
- Transform UI can be dragged again when there is a shape underneath. (#33)

All notable changes to this project will be documented in this file.  
This project adheres to [Semantic Versioning](http://semver.org/).  
This document adheres to [Keep a changelog](http://keepachangelog.com/).
