const urlChanger = {
   addDashed: (url) => {
      return url.replace(/\s+/g, '-');
   },
   removeDashed: (url) => {
      const changedUrl = decodeURIComponent(url.replaceAll('-', ' '));
      return changedUrl;
   },
}

export default urlChanger