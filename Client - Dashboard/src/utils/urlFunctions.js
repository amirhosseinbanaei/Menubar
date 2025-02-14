const urlFunctions = {
   addDashed: (url) => {
      return url.replace(/\s+/g, '-');
   },
   removeDashed: (url) => {
      const changedUrl = decodeURIComponent(url.replaceAll('-', ' '));
      return changedUrl;
   },
   removeDashedPathname: (index) => {
      const changedPathname = decodeURIComponent(
         window.location.pathname.split('/')[index].replaceAll('-', ' ')
      );
      return changedPathname;
   },
   getParamsFromUrl: (whichParam) => {
      let params = new URL(document.location).searchParams;
      return params.get(whichParam);
   },
}

export default urlFunctions;