@echo off
rd build /s /q
mkdir build\img
mkdir build\css
mkdir build\js

copy img\* build\img
rem type NUL > stdin.txt

call .\node_modules\.bin\lessc less\bootstrap.less > build\css\bootstrap.css
call .\node_modules\.bin\lessc -x less\bootstrap.less > build\css\bootstrap.min.css
call .\node_modules\.bin\lessc less\responsive.less > build\css\bootstrap-responsive.css
call .\node_modules\.bin\lessc -x less\responsive.less > build\css\bootstrap-responsive.min.css

copy /B js\bootstrap-transition.js+js\bootstrap-alert.js+js\bootstrap-button.js+js\bootstrap-carousel.js+js\bootstrap-collapse.js+js\bootstrap-dropdown.js+js\bootstrap-modal.js+js\bootstrap-tooltip.js+js\bootstrap-popover.js+js\bootstrap-scrollspy.js+js\bootstrap-tab.js+js\bootstrap-typeahead.js build\js\bootstrap.js

call .\node_modules\.bin\uglifyjs build\js\bootstrap.js > build\js\bootstrap.min.js