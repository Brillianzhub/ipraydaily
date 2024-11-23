function getDownloadLink(originalUrl) {
    // Extract the document ID from the URL
    const docId = originalUrl.match(/\/d\/(.+?)\//)[1];
    // Construct the direct download link
    return `https://docs.google.com/uc?export=download&id=${docId}`;
  }
  
  // Example usage
  const originalUrl = "https://docs.google.com/document/d/1HxKIgS2AB5au4aUs9AmJuKM3EeUc3ozw/edit?usp=sharing&ouid=101690223152098020505&rtpof=true&sd=true";
  const downloadLink = getDownloadLink(originalUrl);
  console.log(downloadLink);  // Outputs the direct download link
  