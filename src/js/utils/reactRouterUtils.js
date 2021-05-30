// import createDebug from 'debug';
// const debug = createDebug('d3d:util:react-router');

// Get parent pathname of component (not current full url)
// This enables going to the parent of an component,
// even when a sub route is open
// routes and route are properties given to all
// react-router's Router children
export function getParentPathName(routes, route) {
  const parentRoutes = [];
  for (const r of routes) {
    if (r === route) break;
    else parentRoutes.push(r);
  }
  return getPathName(parentRoutes);
}

// transform routes object into pathName
export function getPathName(routes) {
  const path = routes.map(r => r.path);
  let pathName = path.join('/');
  // replace 2 or more /'s with one /'
  pathName = pathName.replace(/\/{2,}/, '/');
  if (pathName === '') pathName = '/';
  return pathName;
}
